import { Replace } from "src/helpers/replace"
import { Content } from "./content"
import { randomUUID } from "crypto";

export interface NotificationProps {
    recipientId: string,
    content: Content,
    category: string,
    readAt?: Date | null,
    canceledAt?: Date | null,
    createdAt: Date,
}

export class Notification {
    private _id: string;
    private props: NotificationProps

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string,) {

        this._id = id ?? randomUUID()
        this.props = {
            ...props,
            createdAt: new Date()
        }
    }

    //RANDM ID

    public get id() {
        return this._id
    }

    //RECIPIENT ID

    public set recipientId(recipientId:string) {
        if(recipientId.length < 5){
            throw new Error
        }

        this.props.recipientId = recipientId
    }

    public get recipientId(): string {
        return this.props.recipientId
    }

    //CONTENT

    public set content(content:Content) {
        this.props.content = content
    } 

    public get content(): Content {
        return this.props.content
    }

    //CATEGORY

    public set category(category:string) {
        if(category.length < 5){
            throw new Error
        }

        this.props.category = category
    }

    public get category(): string {
        return this.props.category
    }

    //READ AT

    public read() {
        this.props.readAt = new Date()
    }

    public unread() {
        this.props.readAt = null
    }

    public get readAt(): Date | null |undefined {
        return this.props.readAt
    }

    //CANCELED AT

    public cancel() {
        this.props.canceledAt = new Date()
    }

    public get canceledAt(): Date | null |undefined {
        return this.props.canceledAt
    }

    //GET FOR CREATED AT

    public get createdAt(): Date{
        return this.props.createdAt
    }
}