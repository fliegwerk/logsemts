/*
 * Copyright (c) 2020. by Pablo Klaschka
 *
 * Update the CHANGELOG after the package version has increased. Ideally used as
 * `version` script in the `package.json`.
 *
 * Compatible with the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
 * changelog format.
 *
 * Moves the `## [Unreleased]` section from the changelog into a new
 * release section and re-adds the `## [Unreleased]` template.
 */
const fs = require('fs');
const path = require('path');
const ch = require('chalk');
const shell = require('shelljs');

console.log(ch.italic('Updating changelog...'));

/**
 * The repository URL
 * @type {string}
 * @example `'https://github.com/fliegwerk/dita-ot-helper'`
 */
const repoUrl = 'https://github.com/fliegwerk/logsemts';

/**
 * Get the comparison link URL (on GitHub) between the two passed tags
 * @param {string} prevTag older version's tag
 * @param {string} currTag newer version's tag or `'HEAD'`
 * @return {string} The comparison link url
 */
const getComparisonUrl = (prevTag, currTag) =>
    `${repoUrl}/compare/${prevTag}...${currTag}`;

/**
 * The path to the changelog file.
 * @type {string}
 */
const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');

/**
 * The template for unreleased version notes, split into its lines
 * @type {string[]}
 */
const unreleasedTemplate = `## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security`.split('\n');

try {
    /**
     * The new version number in semantic versioning format
     * @type {string}
     * @example `'1.0.0'`
     */
    const newVersionNumber = require('../package.json').version;
    /**
     * The new version tag
     * @type {string}
     * @example `'v1.0.0'`
     */
    const newVersionTag = `v${newVersionNumber}`;

    /**
     * The (trimmed) lines from the changelog
     * @type {string[]}
     */
    const changelogLines = fs
        .readFileSync(changelogPath)
        .toString()
        .split('\n')
        .map((s) => s.trim());

    /**
     * The index of the `## [Unreleased]` heading in the `changelogLines` array
     * @type {number}
     */
    const unreleasedHeadingIndex = changelogLines.findIndex(
        (value) => value === '## [Unreleased]'
    );

    /**
     * The index of the previous version's heading in the `changelogLines` array
     *
     * `-1` if non-existent
     * @type {number}
     */
    let previousVersionIndex = -1;
    /**
     * The version number of the previous version in semantic versioning format
     * @type {string}
     * @example `'v0.9.0'`
     */
    let previousVersionNumber = '';
    for (let i = unreleasedHeadingIndex + 1; i < changelogLines.length; i++) {
        if (changelogLines[i].startsWith('## [')) {
            previousVersionIndex = i;
            previousVersionNumber = changelogLines[i].match(
                /^## \[(.*)].*$/
            )[1];
            break;
        }
    }

    if (!previousVersionIndex || !previousVersionNumber) {
        console.error(
            ch.red('Invalid format. Check your CHANGELOG.md and try again.')
        );
        process.exit(2);
    } else if (newVersionNumber === previousVersionNumber) {
        console.error(
            ch.red(
                'Unchanged version number. Run this script after the package version number was updated.'
            )
        );
        process.exit(3);
    } else if (!shell.which('git')) {
        console.error(
            ch.red(
                'git is required for this script to work but was not found in PATH.'
            )
        );
        process.exit(4);
    } else {
        /**
         * The index of the comparison page link line for the unreleased changes
         * in the `changelogLines` array.
         * @type {number}
         */
        const unreleasedLinkIndex = changelogLines.findIndex((line) =>
            line.startsWith('[Unreleased]:')
        );

        // Update the comparison link for unreleased changes to base off the new version
        changelogLines[unreleasedLinkIndex] = `[Unreleased]: ${getComparisonUrl(
            `v${newVersionNumber}`,
            'HEAD'
        )}`;

        /**
         * Lines of the new version's changelog
         * @type {string[]}
         */
        const currentChangelogLines = changelogLines.slice(
            unreleasedHeadingIndex + 1,
            previousVersionIndex - 1
        );

        // Remove empty categories in the new version's changelog:
        const curatedChangelogLines = currentChangelogLines.filter(
            (line, i) => {
                const isCategory = line.startsWith('###');
                const isEmpty =
                    currentChangelogLines.length <= i + 1 || // Last line
                    currentChangelogLines[i + 1].startsWith('###'); // Next line is a category heading
                // Explicit operations for more clarity: Remove if it's an empty category
                return !(isCategory && isEmpty);
            }
        );

        /**
         * The new changelog content
         * @type {string}
         */
        const newChangelog = [
            ...changelogLines.slice(0, unreleasedHeadingIndex),
            ...unreleasedTemplate,
            `## [${newVersionNumber}] - ${
                new Date().toISOString().split('T')[0] // yyyy-mm-dd
            }`,
            ...curatedChangelogLines,
            ...changelogLines.slice(
                previousVersionIndex,
                changelogLines.length - 1
            ),
            `[${newVersionNumber}]: ${getComparisonUrl(
                `v${previousVersionNumber}`,
                newVersionTag
            )}`,
            '',
        ].join('\r\n');

        fs.writeFileSync(changelogPath, newChangelog, {
            encoding: 'utf-8',
        });

        // Log current changes
        console.log(ch.bold(`Release Notes (${newVersionTag}):`));
        console.log(curatedChangelogLines.join('\n'));

        /*
         Re-add changes by the script to commit for this version's commit:

         cf. https://docs.npmjs.com/cli/version#description:
         "Again, scripts should explicitly add generated files to the commit using git add."
        */
        shell.exec('git add .', {
            cwd: path.dirname(changelogPath),
            fatal: true,
        });

        console.log(ch.italic('Changelog update complete...'));
    }
} catch (e) {
    console.error(ch.red('An unknown error has occurred. Details:'), e.message);
    process.exit(1);
}
