import { FilterType } from './filter-type'

export interface MovieFilters {
    title?: string,
    rating?: number,
    length?: number,
    genres?: string[],
    countries?: string,
    changedFilter: FilterType
}
