import type { Newsletter, CategorySite } from '@/types/newsletter'
/**
 * Groups newsletters by site, returning an object where each key is a site
 * and its value is the array of newsletters belonging to that site.
 *
 * @param newsletters - The newsletters to group
 * @returns An object keyed by site name
 *
 */
export const groupBySite = (newsletters: Newsletter[]): Record<CategorySite, Newsletter[]> => {
  return newsletters.reduce<Record<string, Newsletter[]>>((acc, newsletter) => {
    if (!acc[newsletter.site]) {
      acc[newsletter.site] = []
    }
    acc[newsletter.site].push(newsletter)

    return acc
  }, {})
}

/**
 * Typed alternative to Object.entries() to prevent a cast inside component.
 *
 * @example
 * const obj: Record <'a' | 'b', number> = { a: 1, b: 2 }
 * objectEntries(obj) // → ['a' | 'b', number][]
 */
export const objectEntries = <T extends object>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}
