'use client'

import { Suspense } from 'react'
import GetStartedForm from './GetStartedForm'

export default function GetStartedPage() {
    return (
        <Suspense fallback={<div style={{ background: '#0B1628', minHeight: '100vh' }} />}>
            <GetStartedForm />
        </Suspense>
    )
}