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
            countries: params['countries'],
            changedFilter: 'none'
        }

        return filters
    }
}


// interface Square {
//     kind: "square";
//     size: number;
// }

// interface Rectangle {
//     kind: "rectangle";
//     width: number;
//     height: number;
// }

// // Someone just added this new `Circle` Type
// // We would like to let TypeScript give an error at any place that *needs* to cater for this
// interface Circle {
//     kind: "circle";
//     radius: number;
// }

// type Shape = Square | Rectangle;

// type Shape1 =
//     {
//         kind: 'square',
//         size: number
//     } |
//     {
//         kind: "rectangle",
//         width: number,
//         height: number,
//     }

// function area(s: Shape) {
//     if (s.kind === "square") {
//         // Now TypeScript *knows* that `s` must a square ;)
//         // So you can use its members safely :)

//         return s.size * s.size;
//     }
//     else if (s.kind === "rectangle") {
//         // Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)
//         // So you can use its members safely :)
//         return s.width * s.height;
//     }
//     else {
//         // ERROR : `Circle` is not assignable to `never`
//         const _exhaustiveCheck: never = s;
//     }
// }
