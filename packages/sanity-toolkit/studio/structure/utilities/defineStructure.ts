import type { StructureBuilder, StructureResolverContext } from 'sanity/structure';

/**
 * Helper for creating and typing composable desk structure parts.
 */
export function defineStructure<StructureType>(
  factory: (S: StructureBuilder, context: StructureResolverContext) => StructureType,
) {
  return factory;
}
