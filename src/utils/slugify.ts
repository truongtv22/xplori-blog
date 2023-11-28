import urlSlug from 'url-slug';

export function getSlug(id, name) {
  return `${urlSlug(name)}-${id}`;
}

export function getIdFormSlug(slug) {
  const parts = slug.split('-');
  return parts[parts.length - 1];
}
