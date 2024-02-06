export function isNumber(value?: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

export function numberWithCommas(x: string) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}