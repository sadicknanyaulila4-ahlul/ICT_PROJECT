export function getLocale() {
    try {
        return localStorage.getItem('ictms-locale') || 'en';
    } catch {
        return 'en';
    }
}

const dict = {
    en: {
        title: 'Project Management',
        subtitle: 'Manage project plans, approvals, requirements, and delivery progress in one secure workspace.',
        secure: 'Secure access',
        secureNote: 'Accounts are created and assigned roles by the system administrator.',
        signin: 'Sign in',
        signinNote: 'Enter your credentials to continue to ICTMS.',
        email: 'Email address',
        password: 'Password',
        remember: 'Remember me',
        needHelp: 'Need help?',
        forgot: 'Forgot password?',
        signinBtn: 'Sign in',
        noAccount: 'New accounts and access roles are issued by the system administrator.',
        checkDetails: 'Please check your sign-in details.',
    },
    sw: {
        title: 'Usimamizi wa Miradi',
        subtitle: 'Simamia mipango ya miradi, idhini, mahitaji na maendeleo ya utekelezaji sehemu moja salama.',
        secure: 'Ufikiaji salama',
        secureNote: 'Akaunti zinafunguliwa na kupewa majukumu na msimamizi wa mfumo.',
        signin: 'Ingia',
        signinNote: 'Weka taarifa zako za kuingia ili kuendelea kwenye ICTMS.',
        email: 'Barua pepe',
        password: 'Nenosiri',
        remember: 'Nikumbuke',
        needHelp: 'Unahitaji msaada?',
        forgot: 'Umesahau nenosiri?',
        signinBtn: 'Ingia',
        noAccount: 'Akaunti mpya na majukumu hutolewa na msimamizi wa mfumo.',
        checkDetails: 'Tafadhali angalia taarifa zako za kuingia.',
    },
};

export function strings(locale) {
    return dict[locale] || dict.en;
}

