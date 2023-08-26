import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { Login } from '../auth/Login'
import { Game } from '../main/Game'
import { Session } from '../auth'

export const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="play" />} />
            <Route path="play" element={<ProtectedRoute element={Game} />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    </BrowserRouter>
)
