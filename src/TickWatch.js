import {ClockSVG} from "./js/clock-creator";
import {isDefined} from "npm-jquery-plugin-helpers/src/helpers";

export const TickWatch = function (options = {}, ...args) {
    let results = [];

    // noinspection JSUnusedGlobalSymbols
    const methods = {
        start: function (results, data) {
            data.isCounting = true;
            data.timer = setTimeout(() => {
                next(getElement(data));
            }, 1000);
            updateData(data);
            getElement(data).trigger('TickWatch.start', [data]);
            return results;
        },
        stop: function (results, data) {
            data.isCounting = false;
            updateData(data);
            getElement(data).trigger('TickWatch.stop', [data]);
            return results;
        },
        set: function (results, data, args) {
            if (data.settings.displayOnly) {
                data.current = parseInt(args[0]);
                updateData(data);
                update(getElement(data));
            }
            else{
                let time = args[0];
                if (isDefined(time)) time = time.trim();
                else time = "";
                if (time.split(":").length === data.partsLength.length) {
                    data.current = time;
                    updateData(data);
                    update(getElement(data));
                }
            }
            return results;
        },
        get: function (results, data) {
            results.push(data.current);
            return results;
        },
        clear: function (results, data) {
            data.current = data.settings.startTime;
            updateData(data);
            update(getElement(data));
            getElement(data).trigger('TickWatch.clear', [data]);
            return results;
        },
        option: function (results, data, args) {
            if (typeof data.settings === 'undefined') {
                data.settings = {};
            }
            if (!isDefined(args) || args.length < 1 || args.length > 2) {
                console.error('Arguments number not valid');
            }
            else if (args.length === 1) {
                results.push(data.settings[args[0]]);
            }
            else if (args.length === 2) {
                data.settings[args[0]] = args[1];
                updateData(data);
            }
            return results;
        },
        destroy: function (results, data) {
            const $clockElement = getElement(data);
            $clockElement.trigger('TickWatch.destroy', [data]);
            $clockElement.empty();
            $clockElement.data('TickWatch', null);
            $clockElement.removeAttr('data-TickWatch-id')
            return results;
        },
    };

    $(this).each(function() {
        let data = $(this).data('TickWatch');
        let idSuffix = Math.floor((Math.random() * 1000) + 100);
        if (!data) {
            let settings = $.extend(
                {
                    partsKeys: ['seconds', 'minutes', {hours: 24}],
                    direction: 'up',//or 'down
                    startTime: null,
                    endTime: null,
                    activeCellClass: 'active-cell',
                    inactiveCellClass: 'inactive-cell',
                    displayOnly: false,
                    displaySize: null,
                },
                options
            );

            let $parent = $(this);

            let parts = {};
            for (let i = 0; i < settings.partsKeys.length; i++) {
                let part = settings.partsKeys[i];
                if (typeof part === 'string') {
                    parts[part] = 60;
                }
                else{
                    let key = Object.keys(part)[0];
                    parts[key] = part[key];
                }
            }

            data = {
                idSuffix: idSuffix,
                settings: settings,
                parts,
                partsLength: settings.partsKeys.length,
                isCounting: false,
                timer: null,
                current: null
            };

            if (data.settings.displayOnly) {
                const defaultDisplaySize = 3;
                data.settings.displaySize = data.settings.displaySize === null ? defaultDisplaySize : data.settings.displaySize;
                data.settings.displaySize = typeof data.settings.displaySize === 'number' ? data.settings.displaySize : parseInt(/** @type {string} */data.settings.displaySize);
                data.settings.displaySize = isNaN(data.settings.displaySize) ? defaultDisplaySize : data.settings.displaySize;
                data.current = 0;
            }
            else {
                let [minVal, maxVal] = [getInitialTime(data.settings.partsKeys.length), getFinalTime(parts)]

                if (data.settings.startTime === null) {
                    data.settings.startTime = data.settings.direction === "up" ? minVal : maxVal;
                }
                if (data.settings.endTime === null) {
                    data.settings.endTime = data.settings.direction !== "up" ? minVal : maxVal;
                }

                data.current = settings.startTime;
            }

            //save the settings of the element
            $(this).data('TickWatch', data);
            $(this).attr('data-TickWatch-id', idSuffix);


            if (data.settings.displayOnly) {
                let arrayParts = (new Array(/** @type {number} */data.settings.displaySize)).fill("").map((n, i) => "displayPart_"+(i+1));
                data.parts = {};
                for (let i = 0; i < arrayParts.length; i++) {
                    data.parts[arrayParts[i]] = null;
                }
            }
            let $clockDom = $(ClockSVG("TickWatch_"+idSuffix, Object.keys(data.parts), data.settings.displayOnly));
            $clockDom.appendTo($parent);
            update($(this));
        }
        else{
            if (typeof options === 'string' && typeof methods[options] !== 'undefined') {
                results = methods[options](results, data, [...args]);
            }
        }
    });
    return results.length > 1 ? results : (results.length === 0 ? null : results[0]);
}

const getInitialTime = (length) => {
    return (new Array(length)).fill("00").join(":");
}

const getFinalTime = (parts) => {
    let values = Object.values(parts);
    return values.map(value => format(value - 1)).join(":");
}

const display = (pathId, a, n, data) => {
    const number = [
        [1, 1, 1, 0, 1, 1, 1], // 0
        [0, 0, 1, 0, 0, 1, 0], // 1
        [1, 0, 1, 1, 1, 0, 1], // 2
        [1, 0, 1, 1, 0, 1, 1], // 3
        [0, 1, 1, 1, 0, 1, 0], // 4
        [1, 1, 0, 1, 0, 1, 1], // 5
        [1, 1, 0, 1, 1, 1, 1], // 6
        [1, 0, 1, 0, 0, 1, 0], // 7
        [1, 1, 1, 1, 1, 1, 1], // 8
        [1, 1, 1, 1, 0, 1, 1]  // 9
    ];
    n = number[n];
    let i = 0;
    while (i < n.length) {
        const $crystal = $(`#${pathId}_${a}_${(i + 1)}`);
        if (n[i] === 0) {
            $crystal.removeClass(data.settings.activeCellClass);
            $crystal.addClass(data.settings.inactiveCellClass);
        }
        else {
            $crystal.removeClass(data.settings.inactiveCellClass);
            $crystal.addClass(data.settings.activeCellClass);
        }
        i++;
    }
}

const format = (value) => {
    value = value + ''

    if (value.length === 1) {
        return '0' + value
    }

    return value
}

const next = ($clockElement) => {
    let data = $clockElement.data('TickWatch');
    if (!data || !data.isCounting) {
        getElement(data).trigger('TickWatch.end', [data]);
        return;
    }
    if (data.current === data.settings.endTime) {
        data.isCounting = false;
        updateData(data);
        getElement(data).trigger('TickWatch.end', [data]);
        return;
    }
    data = changeTime(data);
    updateData(data);
    update($clockElement);
    setTimeout(function() {
        next($clockElement)
    }, 1000)
}

const update = ($clockElement) => {
    let data = $clockElement.data('TickWatch');
    getElement(data).trigger('TickWatch.update', [data]);
    let currentTime = data.current;
    let currentTimeParts;
    if (data.settings.displayOnly) {
        currentTimeParts = currentTime.toString().split("");
        for (let i = currentTimeParts.length; i < data.settings.displaySize; i++) {
            currentTimeParts.unshift("0");
        }
    }
    else{
        currentTimeParts = currentTime.split(":")
    }
    currentTimeParts.reverse();
    let partsIds = Object.keys(data.parts);
    for (let i = partsIds.length - 1; i >= 0; i--) {
        let partId = partsIds[i];
        let partValue = currentTimeParts[i];
        let partValueParts = data.settings.displayOnly ? [partValue] : partValue.split("");
        for (let j = 0; j < partValueParts.length; j++) {
            display(`TickWatch_${data.idSuffix}_${partId}`, j === (partValueParts.length-1) ? "a" : "b", parseInt(partValueParts[j]), data);
        }
    }
}

const changeTime = (data) => {
    let currentParts = data.current.split(":");
    currentParts.reverse();
    let partsMaxes = Object.values(data.parts);
    currentParts = currentParts.map(part => parseInt(part));
    if (data.settings.direction === "up") {
        for (let i = 0; i < currentParts.length; i++) {
            if (currentParts[i] < (partsMaxes[i] - 1)) {
                currentParts[i]++;
                break;
            }
            else{
                currentParts[i] = 0;
            }
        }
    }
    else{
        for (let i = 0; i < currentParts.length; i++) {
            if (currentParts[i] > 0) {
                currentParts[i]--;
                break;
            }
            else{
                currentParts[i] = partsMaxes[i] - 1;
            }
        }
    }

    let parts = currentParts.map(part => format(part));
    parts.reverse();
    data.current = parts.join(":");
    return data;
}

const updateData = (data) => {
    let $clockElement = getElement(data);
    $clockElement.data('TickWatch', data);
}

const getElement = (data) => {
    return $('[data-TickWatch-id="'+data.idSuffix+'"]');
}