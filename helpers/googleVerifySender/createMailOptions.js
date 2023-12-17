const createMailOptions = (userEmail, password) => {
    return {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'New password',
        text: `Your new password ${password}`,
    };

}

module.exports = createMailOptions