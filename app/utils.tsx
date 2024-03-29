export function isNumber(value?: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

export function numberWithCommas(x: string) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nFormatter(num, digits) {
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "K" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "B" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" }
        ];
        const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
        const item = lookup.findLast(item => num >= item.value);
        return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
      }

export function cachedMinute(minutes: number) {
        var minutes = 1000 * 60 * minutes;
        var date = new Date()  //or use any other date
        return new Date(Math.round(date.getTime() / minutes) * minutes).getTime()
}