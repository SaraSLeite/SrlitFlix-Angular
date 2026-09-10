import { AutoScrollDirective } from "./auto-scroll.directive";

describe('AutoScrollDirective', () => {
    it('should create an instance', () => {
        const elementRef = { nativeElement: document.createElement('div') } as any;
        const renderer = {} as any;
        const directive = new AutoScrollDirective(elementRef, renderer);
        expect(directive).toBeTruthy();
    });
});