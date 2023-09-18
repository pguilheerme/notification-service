export class Content {
    private readonly content: string;

    get value() {
        return this.content
    }

    private validateContentLength(content:string): boolean {
        return content.length >= 5 && content.length <= 240
    }

    constructor(content: string){
        const isContentLengthValidate = this.validateContentLength(content)

        if(!isContentLengthValidate) {
            throw new Error('Content Length error.')
        }

        this.content = content
    }
}