// translate router.meta.title, be used in breadcrumb sidebar tags view
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title)

  if (hasKey) {
    return translatedTitle
  }
  return title
}
