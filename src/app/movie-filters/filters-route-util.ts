import { MovieFilters } from './movie-filters';
import { Params } from '@angular/router'
import * as _ from "lodash";

export class FiltersRouteUtil {
    static parse(params: Params) {
        let valueOrDefault = <TInput>(value: TInput, defaultValue: TInput | undefined) =>
            _.isNil(value) || _.isNaN(value) ? defaultValue : value;

        let filters: MovieFilters = {
            title: params['title'],
            rating: valueOrDefault(parseFloat(params['rating']), undefined),
            length: valueOrDefault(parseFloat(params['length']), undefined),
            genres: JSON.parse(params['genres'] || '[]'),
            countries: JSON.parse(params['countries'] || '[]'),
            changedFilter: 'none'
        }

        return filters
    }
}
