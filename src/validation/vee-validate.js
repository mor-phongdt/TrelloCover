export default {
    locale: 'en',
    dictionary: {
        en: {
            custom: {
                fullName : {
                    required : 'Fullname is required',
                    min : 'Fullname must be > 6 characters',
                    max : 'Fullname may not be > 20 characters'
                },
                email : {
                    required : 'Email is required',
                    email : 'Invalid email address'
                },
                password : {
                    required : 'Password is required',
                    min : 'Password must be > 6 characters',
                    max : 'Password may not be > 32 characters' 
                },
                confirmPassword : {
                    required : 'Please confirm password',
                    is : 'Not match password'
                },
                userId : {
                    required : 'User is required',
                    email : 'User must be your email'
                }
            }
        }
    }
}
