export function updateEntity<TEntity extends object>(
  entity: TEntity,
  patch: Partial<NoInfer<TEntity>>,
): TEntity {
  // NoInfer prevents the patch from contributing a wider inferred entity type.
  // This copies only the top level; nested objects keep their identities.
  return { ...entity, ...patch }
}
