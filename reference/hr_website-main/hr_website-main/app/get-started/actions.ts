'use server'

interface SubmissionData {
    fullName: string
    company: string
    email: string
    phone?: string
    teamSize?: string
    message?: string
    plan: {
        tier: string
        type: 'employer' | 'agency'
        billing: string
        price: string
    }
}

/**
 * Handles the "Get Started" form submission.
 * In a real-world scenario, you would use a library like 'resend' or 'nodemailer' here.
 */
export async function submitGetStartedForm(data: SubmissionData) {
    // Simulate a delay for the network request
    await new Promise((resolve) => setTimeout(resolve, 1500))

    try {
        // Log the submission data for debugging/mocking purposes
        console.log('--- NEW FORM SUBMISSION (HR OPS) ---')
        console.log(`Plan:    ${data.plan.tier} (${data.plan.type})`)
        console.log(`Billing: ${data.plan.billing} (Rs. ${data.plan.price}/mo)`)
        console.log(`Name:    ${data.fullName}`)
        console.log(`Company: ${data.company}`)
        console.log(`Email:   ${data.email}`)
        console.log(`Phone:   ${data.phone || 'N/A'}`)
        console.log(`Size:    ${data.teamSize || 'N/A'}`)
        console.log(`Message: ${data.message || 'None'}`)
        console.log('------------------------------------')

        // --- REAL EMAIL LOGIC ---
        // if (process.env.RESEND_API_KEY) {
        //     await resend.emails.send({
        //         from: 'HR Ops <onboarding@hrops.io>',
        //         to: 'info@hrops.io',
        //         subject: `New ${data.plan.tier} Plan Lead - ${data.company}`,
        //         html: `...`
        //     })
        // }

        return { success: true }

    } catch (error) {
        console.error('Submission error:', error)
        return { 
            success: false, 
            message: 'Failed to send details. Please try again or email us directly at info@hrops.io.' 
        }
    }
}
