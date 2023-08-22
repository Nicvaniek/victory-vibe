import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { Competitions } from '../competition/Competitions'
import { Login } from '../auth/Login'

export const routes = {
    ROOT: '/',
    LOGIN: '/login',
    COMPETITIONS: '/competitions',
    ONBOARDING: '/onboarding',
    LEADERBOARD: '/competitions/{id}/leaderboard',
}

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path={routes.ROOT}
                element={<Navigate to={routes.COMPETITIONS} />}
            />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route
                path={routes.COMPETITIONS}
                element={<ProtectedRoute element={<Competitions />} />}
            />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </BrowserRouter>
)
