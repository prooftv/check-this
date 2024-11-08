import { SchemaTypeDefinition } from 'sanity';
import { registerModularBlockSchemas } from '@/features/modular-content-blocks/lib/registerModularBlockSchemas';

export const objects: SchemaTypeDefinition[] = [...registerModularBlockSchemas()];
