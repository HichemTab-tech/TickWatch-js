const ClockSVG = (id = "defaultId", parts = ['seconds', 'minutes', 'hours']) => {
    const viewBoxWidth = 16 + 22 + 42 * (parts.length - 1);
    const viewBoxHeight = 36;
    const partHeight = 42;

    const createParts = (idPrefix, partsIds) => {
        let parts = [];
        const part = (part_id, y, first = false) => ` <g>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_7' class="clock-cell" d='M${viewBoxWidth-16-y},69l3-3h6l3,3c0,0-1,1-3,1h-6C${viewBoxWidth-15-y},70,${viewBoxWidth-16-y},69,${viewBoxWidth-16-y},69z'/>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_6' class="clock-cell" d='M${viewBoxWidth-3-y},55l-3,2v8l3,3c0,0,1-1,1-3v-7C${viewBoxWidth-2-y},56,${viewBoxWidth-3-y},55,${viewBoxWidth-3-y},55z'/>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_5' class="clock-cell" d='M${viewBoxWidth-17-y},55l3,2v8l-3,3c0,0-1-1-1-3v-7C${viewBoxWidth-18-y},56,${viewBoxWidth-17-y},55,${viewBoxWidth-17-y},55z'/>
                                        <polygon id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_4' class="clock-cell" points='${viewBoxWidth-13-y},52 ${viewBoxWidth-7-y},52 ${viewBoxWidth-4-y},54 ${viewBoxWidth-7-y},56 ${viewBoxWidth-13-y},56 ${viewBoxWidth-16-y},54'/>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_3' class="clock-cell" d='M${viewBoxWidth-3-y},40l-3,3v8l3,2c0,0,1-1,1-3v-7C${viewBoxWidth-2-y},41,${viewBoxWidth-3-y},40,${viewBoxWidth-3-y},40z'/>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_2' class="clock-cell" d='M${viewBoxWidth-17-y},40l3,3v8l-3,2c0,0-1-1-1-3v-7C${viewBoxWidth-18-y},41,${viewBoxWidth-17-y},40,${viewBoxWidth-17-y},40z'/>
                                        <path id='${idPrefix}_${part_id}_${first ? 'a' : 'b'}_1' class="clock-cell" d='M${viewBoxWidth-16-y},39l3,3h6l3-3c0,0-1-1-3-1h-6C${viewBoxWidth-15-y},38,${viewBoxWidth-16-y},39,${viewBoxWidth-16-y},39z'/>
                                    </g>
                                   `;
        for (let i = 0; i < partsIds.length; i++) {
            parts.push(`  <g id=${idPrefix}_${partsIds[i]}>
                            ${part(partsIds[i], i * partHeight, true)}
                            ${part(partsIds[i], i * partHeight + 18)}
                        </g>
                    `);
        }
        parts.reverse();
        return parts.join('');
    }

    const createDots = (number) => {
        const dots = [];
        for (let i = 0; i < number; i++) {
            const offset = i * partHeight + 40;
            dots.push(`<circle cx='${offset}' cy='50' r='2'/><circle cx='${offset}' cy='58' r='2'/>`)
        }
        dots.reverse();
        return `<g id='dots'>${dots.join('')}</g>`;
    }

    return `
                <svg class='TickWatch-clock' id='${id}' viewBox='0 36 ${viewBoxWidth} ${viewBoxHeight}' xmlns='http://www.w3.org/2000/svg'>
                    ${createParts(id, parts, 36)}
                    ${createDots(parts.length - 1)}
                </svg>
            `;
}

export {ClockSVG};