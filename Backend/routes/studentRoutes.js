const express = require('express');
const router = express.Router();
const { 
    loginStudent, 
    viewProfile, 
    updateProfile, 
    requestAccountDeletion,
    joinGroup,
    getApprovedGroups
} = require('../controllers/studentController');
const { authenticateUser, authorizeRoles } = require('../middlewares/authMiddleware');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

// Student Login
router.post('/login', loginStudent);

// View Profile
router.get('/profile', authenticateUser, viewProfile);

// Update Profile
router.put('/profile', authenticateUser, updateProfile);

// Request Account Deletion
router.post('/deletion-request', authenticateUser, requestAccountDeletion);

router.get('/notifications', authenticateUser, authorizeRoles(['Admin', 'Teacher', 'Student']), getNotifications);
router.put('/notifications/:id/read', authenticateUser, markAsRead);

router.post('/groups/join', authenticateUser, authorizeRoles(['Student']), joinGroup);

router.get('/groups', authenticateUser, getApprovedGroups);

module.exports = router;
