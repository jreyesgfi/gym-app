
import { AxiosRequestConfig } from "axios";


interface ConnectionData extends AxiosRequestConfig 
{
    method?: string;
    headers: { [key: string]: string };
    redirect: RequestRedirect;
}

export const connectionUrl = 'https://script.google.com/macros/s/AKfycbyogjGxW-ICpJj7Os9hDy_a7vuIw693HRCRjhTY_Z4ueODouv4UiC7gm575_f57SEtfcA/exec';
export const connectionData:ConnectionData = {
            headers: {'Content-type': 'application/x-www-form-urlencoded' },
            redirect: "follow"
        }

export const postDataMethod = 'addData';
export const getDataMethod = 'getData';