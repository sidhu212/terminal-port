import { COMMANDS } from '../data/commands';

/**
 * Parses a command string and returns a result object, or null if handled internally.
 */
export const parseCommand = (input, clearCallback, themeCallback, downloadCallback) => {
    const trimmed = input.trim();
    const parts = trimmed.split(' ');
    const mainCommand = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : null;

    if (trimmed === '') {
        return { type: 'empty', command: '', content: '' };
    }

    if (mainCommand === 'clear') {
        clearCallback();
        return null;
    }

    // Handle theme switching
    if (mainCommand === 'theme' && arg) {
        const success = themeCallback(arg);
        if (success) {
            return {
                type: 'success',
                command: trimmed,
                content: `Theme changed to: ${arg}`,
            };
        } else {
            return {
                type: 'error',
                command: trimmed,
                content: `Theme '${arg}' not found. Available themes: coral, matrix, cyber, purple, amber.`,
            };
        }
    }

    // Handle download triggering
    if (mainCommand === 'download') {
        downloadCallback();
        return {
            type: 'success',
            command: trimmed,
            content: COMMANDS.download.content,
        };
    }

    // Handle interactive message sending
    if (mainCommand === 'cd' && arg === 'message') {
        return {
            type: 'START_INTERACTIVE',
            command: trimmed,
            content: 'Initiating message wizard...',
        };
    }

    // Handle dynamic date command
    if (mainCommand === 'date') {
        return {
            type: 'success',
            command: trimmed,
            content: new Date().toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
        };
    }

    // Handle dynamic time command
    if (mainCommand === 'time') {
        return {
            type: 'success',
            command: trimmed,
            content: new Date().toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
        };
    }

    // Handle echo command
    if (mainCommand === 'echo') {
        return {
            type: 'success',
            command: trimmed,
            content: parts.slice(1).join(' '),
        };
    }

    // Handle ls command
    if (mainCommand === 'ls') {
        return {
            type: 'success',
            command: trimmed,
            content: 'about  education  experience  projects  skills  achievements  certifications  contact',
        };
    }

    const command = COMMANDS[mainCommand];

    if (command) {
        return {
            type: 'success',
            command: trimmed,
            content: command.content,
            links: command.links || null,
            visualType: command.visualType || null,
        };
    }

    return {
        type: 'error',
        command: trimmed,
        content: `Command not found: '${trimmed}'\nType 'help' to see available commands.`,
    };
};
