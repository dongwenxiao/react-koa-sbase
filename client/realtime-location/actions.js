import {
    LOCATION_UPDATE
} from '../reducer.js'

export function update(location) {
    return {
        type: LOCATION_UPDATE,
        location
    }
}