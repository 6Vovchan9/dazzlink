export abstract class AbsractExample {
    
    name = 'Ivan';
    radius = 12;

    // constructor(userName?: string) {
    //     if (userName) this.name = userName;
    // }

    abstract requiredMethod(): number;

    public getName(incomingName?: string): string {
        return incomingName || this.name;
    }

    public hideScroll(): void {
        document.body.classList.add('no-scroll');
    }

    public showScroll(): void {
        document.body.classList.remove('no-scroll');
    }
}