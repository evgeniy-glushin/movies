import { MovieFilters } from './movie-filters';
import { Params } from '@angular/router'
import * as _ from "lodash";

export class FiltersRouteUtil {
    static parse(params: Params) {
        let valueOrDefault = (value, defaultValue) =>
            _.isNil(value) || _.isNaN(value) ? defaultValue : value;

        let filters: MovieFilters = {
            title: params['title'],
            rating: valueOrDefault(parseFloat(params['rating']), undefined),
            length: valueOrDefault(parseFloat(params['length']), undefined),
            genres: params['genres'],
            countries: params['countries']
        }

        return filters
    }
}
