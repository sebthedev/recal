import Color = require('../../../library/Color/Color');
import DateTime = require('../../../library/DateTime/DateTime');
import Events = require('./Events');

// when we support todos in addition to events, this class will become a base class (?)

class EventsModel implements Events.IEventsModel
{
    constructor(arg: Events.IEventsModel)
    {
        this.eventId = arg.eventId;
        this.title = arg.title;
        this.description = arg.description;
        this.location = arg.location;
        this.sectionId = arg.sectionId;
        this.eventTypeCode = arg.eventTypeCode;
        this.startDate = new DateTime(arg.startDate);
        this.endDate = new DateTime(arg.endDate);
        this.lastEdited = new DateTime(arg.lastEdited);
        this.eventGroupId = arg.eventGroupId;
        this.sectionColor = arg.sectionColor;
        this.revisionId = arg.sectionId;
        this.courseId = arg.courseId;
    }

    private _eventId: string = null;
    public get eventId(): string { return this._eventId; }

    public set eventId(value: string) { this._eventId = value; }

    private _title: string = null;
    public get title(): string { return this._title; }

    public set title(value: string) { this._title = value; }

    private _description: string = null;
    public get description(): string { return this._description; }

    public set description(value: string) { this._description = value; }

    private _location: string = null;
    public get location(): string { return this._location; }

    public set location(value: string) { this._location = value; }

    private _sectionId: string = null;
    public get sectionId(): string { return this._sectionId; }

    public set sectionId(value: string) { this._sectionId = value; }

    private _courseId: string = null;
    public get courseId(): string { return this._courseId; }

    public set courseId(value: string) { this._courseId = value; }

    private _eventTypeCode: string = null;
    public get eventTypeCode(): string { return this._eventTypeCode; }

    public set eventTypeCode(value: string) { this._eventTypeCode = value; }

    private _startDate: DateTime = null;
    public get startDate(): DateTime { return this._startDate; }

    public set startDate(value: DateTime) { this._startDate = value; }

    private _endDate: DateTime = null;
    public get endDate(): DateTime { return this._endDate; }

    public set endDate(value: DateTime) { this._endDate = value; }

    private _lastEdited: DateTime = null;
    public get lastEdited(): DateTime { return this._lastEdited; }

    public set lastEdited(value: DateTime) { this._lastEdited = value; }

    private _eventGroupId: string = null;
    public get eventGroupId(): string { return this._eventGroupId; }
    public set eventGroupId(value: string) { this._eventGroupId = value; }

    private _sectionColor: Color = null;
    public get sectionColor(): Color { return this._sectionColor; }
    public set sectionColor(value: Color) { this._sectionColor = value; }

    private _revisionId: string = null;
    public get revisionId(): string { return this._revisionId; }
    public set revisionId(value: string) { this._revisionId = value; }
}

export = EventsModel;
