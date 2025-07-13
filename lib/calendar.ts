export interface CalendarEvent {
    title: string;
    description: string;
    location: string;
    start: string; // Use YYYYMMDD format
    end: string; // Use YYYYMMDD format
}
export interface ContactInfo {
    firstName: string;
    lastName: string;
    mobile: string;
    phone: string;
    fax: string;
    email: string;
    company: string;
    job: string;
    address: ContactAddress;
    website: string;
}
export interface ContactAddress {
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
}
