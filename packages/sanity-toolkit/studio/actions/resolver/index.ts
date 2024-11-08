import type {
  DocumentActionComponent,
  DocumentActionsContext,
  DocumentActionsResolver,
} from 'sanity';

/** The actual Handler for the action modifier. If used without an Action Modifier, will call it as if it was modifying for all actions and schema types */
export type ActionHandler = (
  action: DocumentActionComponent,
  context: DocumentActionsContext,
) => DocumentActionComponent;

export interface ActionModifier {
  actions?: string | Array<string>;
  schemaTypes?: string | Array<string>;
  handler: ActionHandler;
  new?: never;
}

export interface NewAction {
  new: true;
  schemaTypes?: string | Array<string>;
  actionComponent: DocumentActionComponent;
}

/** The array passed to our main modifyActions function—i.e. the types of things users are allowed to add to their config */
export type ActionModifierList = Array<ActionModifier | ActionHandler | NewAction>;

export function newAction(object: Omit<NewAction, 'new'> & { new?: true }) {
  return {
    new: true,
    ...object,
  } as const;
}

export function modifyAction(object: ActionModifier | ActionHandler) {
  return object;
}

export function resolveActionsPipeline(
  actionModifiers: ActionModifierList,
  callback?: DocumentActionsResolver,
): DocumentActionsResolver {
  return (
    previousActions: Array<DocumentActionComponent>,
    context: DocumentActionsContext,
  ) => {
    const modifiedActions = actionsPipeline(previousActions, context, actionModifiers);

    if (callback) {
      return callback(modifiedActions, context);
    }

    return modifiedActions;
  };
}

export const actionsPipeline = (
  previousActions: Array<DocumentActionComponent>,
  context: DocumentActionsContext,
  actionModifiers: ActionModifierList,
) => {
  return actionModifiers.reduce((currentActions, config) => {
    if (typeof config === 'function') {
      return currentActions.map((action) => config(action, context));
    }

    if (config.new) {
      const { schemaTypes, actionComponent } = config;

      const schemaTypesArray = stringToArray(schemaTypes);

      if (schemaTypesArray !== undefined && !schemaTypesArray.includes(context.schemaType)) {
        return currentActions;
      }

      return [...currentActions, actionComponent];
    }

    // At this point, config must be ActionModifier
    const { actions: allowedActions, schemaTypes, handler } = config;

    // We support both a string and an array of strings for actions and schemaTypes
    const allowedActionsArray = stringToArray(allowedActions);
    const schemaTypesArray = stringToArray(schemaTypes);

    // Skip if schema type doesn't match config
    if (schemaTypesArray !== undefined && !schemaTypesArray.includes(context.schemaType)) {
      return currentActions;
    }

    return currentActions.map((documentAction) => {
      // Skip if allowed actions is not undefined, and action type doesn't match list of allowed actions
      if (
        allowedActionsArray !== undefined &&
        (documentAction.action === undefined ||
          !allowedActionsArray.includes(documentAction.action))
      ) {
        return documentAction;
      }

      const modifiedAction = handler(documentAction, context);
      modifiedAction.action = documentAction.action; // Needed to ensure the pipeline can alter the action multiple times by looking up action.action, e.g. 'publish'

      return modifiedAction;
    });
  }, previousActions);
};

function stringToArray(stringOrArray: undefined | string | Array<string>) {
  return typeof stringOrArray === 'string' ? [stringOrArray] : stringOrArray;
}
