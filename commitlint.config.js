module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Disable all rules
        'body-leading-blank': [0],
        'body-max-line-length': [0],
        'footer-leading-blank': [0],
        'footer-max-line-length': [0],
        'header-max-length': [0],
        'scope-case': [0],
        'subject-case': [0],
        'subject-empty': [0],
        'subject-full-stop': [0],
        'type-case': [0],
        'type-empty': [0],
        'type-enum': [0]
    }
}; 