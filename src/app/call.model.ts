export class Call {

    id: string;
    status: string;
    descr: {
        descr: string,
        code: {
            codes: string,
            descr: string,
            priority: [
                {
                    severity: string,
                    color: string,
                    response: string,
                    grade: string,
                    target: string
                }
            ]
        }
    };
    loc:
        {
            address: string,
            lat: number,
            long: number
        };

}
