import '@scss/style.scss';
import {TickWatch} from "./src/TickWatch";

(function ($) {
    $.fn.TickWatch = TickWatch;
})(jQuery);

export { TickWatch };