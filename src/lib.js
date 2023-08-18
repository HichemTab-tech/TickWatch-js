export const LIBRARY_FUNCTION_NAME = function (options = {}, ...args) {
    let results = [];

    // noinspection JSUnusedGlobalSymbols
    const methods = {
        destroy: function (results, data) {

            return results;
        },
    };

    $(this).each(function() {
        let data = $(this).data('LIBRARY_FUNCTION_NAME');
        let idSuffix = Math.floor((Math.random() * 1000) + 100);
        if (!data) {
            let settings = $.extend(
                {

                },
                options
            );
            let $parent = $(this);

            data = {
                idSuffix: idSuffix,
                settings: settings
            };
            //save the settings of the element
            $(this).data('LIBRARY_FUNCTION_NAME', data);
            $(this).attr('data-LIBRARY_FUNCTION_NAME-id', idSuffix);
        }
        else{
            if (typeof options === 'string' && typeof methods[options] !== 'undefined') {
                results = methods[options](results, data, [...args]);
            }
        }
    });
    return results.length > 1 ? results : (results.length === 0 ? null : results[0]);
}