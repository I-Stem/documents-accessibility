import { Country } from './country.model'
import { Theme } from './theme.model'
import { Region } from './region.model'
import { IMessage } from './message.model';
import { CommonService } from 'src/app/core/services/common.service';

export class IUser {
    _id: string | null
    first_name: string
    last_name: string
    email: string
    password: string
    passwordHash: string
    mobile: string
    profile_pic: string
    shortBio: string
    longBio: string
    gender: string
    country: string // ObjectId of Country
    work_places: any[] //ObjectId of Region
    thematic_area: any[]//ObjectId of Theme
    education: string
    experience: any[]
    social_links: {
        fb: string,
        linkedin: string,
        instagram: string,
        twitter: string
    }
    disability: string
    disability_reason: string
    role: string
    last_login_date: string
    groups: {
        approved: any[], //will store object having id,date,activity_date
        pending: any[] //will store object having id,date
    }
    projects: {
        approved: any[], //will store object having id,date
        pending: any[] //will store object having id,date
    }
    like_count: number
    post_count: number
    dob: number
    chat_users: any[] //will store objects of type IMessage
    createdAt: string;
    updatedAt: string;

    public get fullName(): string {
        return this.first_name + " " + this.last_name;
    }

    public get location(): string {
        return this.work_places.length > 0 ? this.work_places[0] : "";
    }

    public get field(): string {
        return this.thematic_area.length > 0 ? this.thematic_area[0] : "";
    }

    public get latestExperience() {
        return this.experience.length > 0 ? this.experience[this.experience.length - 1] : { job_profile: "", company: "" };
    }

    public get latestEducation() {
        return this.education.length > 0 ? this.education[this.education.length - 1] :  "";
    }

    public get lastPosted(): string {
        return CommonService.convertISODatetoReadable((new Date()).toISOString());
        
    }

    constructor() {
        this._id = "";
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.passwordHash = "";
        this.mobile = "";
        this.profile_pic = "";
        this.shortBio = "";
        this.longBio = "";
        this.gender = "";
        this.country = "";
        this.work_places = [];
        this.thematic_area = [];
        this.education = "";
        this.experience = [];
        this.social_links = {
            fb: "",
            linkedin: "",
            instagram: "",
            twitter: ""
        }
        this.disability = "";
        this.disability_reason = "";
        this.role = "";
        this.last_login_date = "";
        this.groups = {
            approved: [],
            pending: []
        };
        this.projects = {
            approved: [],
            pending: []
        };
        this.like_count = 0;
        this.post_count = 0;
        this.dob = 0;
        this.chat_users = [];
        this.createdAt = "";
        this.updatedAt = "";
    }

    public static fromJSON(data: any) {
        const user = new IUser();
        user._id = data._id;
        user.first_name = data.first_name;
        user.last_name = data.last_name;
        user.email = data.email;
        user.passwordHash = data.password;
        user.mobile = data.mobile;
        user.profile_pic = data.profile_pic;
        user.shortBio = data.shortBio;
        user.longBio = data.longBio;
        user.gender = data.gender;
        user.country = data.country;
        user.work_places = data.work_places;
        user.thematic_area = data.thematic_area;
        user.education = data.education;
        user.experience = data.experience;
        user.social_links.fb = data.social_links.fb;
        user.social_links.linkedin = data.social_links.linkedin;
        user.social_links.instagram = data.social_links.instagram;
        user.social_links.twitter = data.social_links.github;
        user.disability = data.disability;
        user.disability_reason = data.disability_reason;
        user.role = data.role;
        user.last_login_date = data.last_login_date;
        user.groups.approved = data.groups;
        user.groups.pending = data.groups;
        user.projects.approved = data.projects;
        user.projects.pending = data.projects;
        user.like_count = data.like_count;
        user.post_count = data.post_count;
        user.dob = data.dob;
        user.chat_users = data.messages;
        user.createdAt = data.created_at;
        user.updatedAt = data.updated_at;
        return user;
    }
};
