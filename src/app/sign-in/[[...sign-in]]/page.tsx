import { SignIn } from "@clerk/nextjs";
import styles from './signin.module.css';



export default function Page(){
    return (
        <>
        <div className={styles.signInContainer}>
        <SignIn path="/sign-in"  routing="path" signUpUrl="/sign-up" appearance={{
            elements: {
                rootBox: styles.primaryFont,
                card: styles.primaryColor,
                headerTitle: styles.textPrimaryColor,
                headerSubtitle: styles.textPrimaryColor,
                socialButtons: styles.defaultColor,
                formFieldLabel: styles.textPrimaryColor,
                formButtonPrimary: styles.submitButton,
                footerActionText: styles.textPrimaryColor,
                dividerText: styles.textPrimaryColor,
                formField__password__error: styles.textPrimaryColor,
                formFieldRow__password: styles.textPrimaryColor,
                formFieldAction__password__error: styles.textPrimaryColor,
                formFieldWarningText: styles.textPrimaryColor,
                formFieldHintText: styles.textPrimaryColor,
                formFieldErrorText: styles.textPrimaryColor,
                dividerLine: styles.thirdColor,
                footerActionLink: styles.textSecondaryColor,
                formFieldErrorText__code: styles.textPrimaryColor,
                identityPreviewText: styles.textPrimaryColor,
                formHeaderTitle: styles.textPrimaryColor,
                formHeaderSubtitle: styles.textPrimaryColor,
                formResendCodeLink: styles.textSecondaryColor,
                otpCodeFieldInputs: styles.textThirdColor,
                otpCodeFieldInput: styles.verificationInput
            }
        }}/>
        </div>
        </>
    )
}