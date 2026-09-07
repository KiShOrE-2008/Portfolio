import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const LeetCodeIcon = ({ size = 22, className = "" }) => (
    <img
        src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/leetcode-dark.webp"
        alt="LeetCode"
        width={size}
        height={size}
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, objectFit: 'contain' }}
    />
);

const GitHubIcon = ({ size = 22, className = "", fill = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

export default function CodingActivity() {
    const activityRef = useRef(null);
    const [activeModal, setActiveModal] = useState(null); // 'github' | 'leetcode' | null
    const [hoveredContestIndex, setHoveredContestIndex] = useState(null);

    useGSAP(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return;

        gsap.fromTo('.section-header',
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: activityRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo('.platform-card',
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: activityRef.current.querySelector('.platform-boxes-grid'),
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }, { scope: activityRef });

    const [leetcodeData, setLeetcodeData] = useState({
        solvedProblem: 251,
        easySolved: 168,
        mediumSolved: 77,
        hardSolved: 6,
        ranking: 275163,
        contestRating: 1555,
        topPercentage: '31.61%',
        attendedContests: 23
    });

    const [githubStats, setGithubStats] = useState({
        totalCommits: 234,
        totalStars: 10,
        totalPRs: 3,
        mergedPRs: 1,
        mergedPRPercent: '33.33 %',
        publicRepos: 19,
        followers: 11,
        grade: 'C+',
        languages: [
            { name: 'TypeScript', percent: 50.64, color: '#3178c6' },
            { name: 'JavaScript', percent: 31.16, color: '#f7df1e' },
            { name: 'Java', percent: 9.56, color: '#b07219' },
            { name: 'Python', percent: 8.52, color: '#3572A5' },
            { name: 'Shell', percent: 0.07, color: '#89e051' },
            { name: 'Batchfile', percent: 0.06, color: '#C1F12E' }
        ]
    });

    const contestHistory = [
        { x: 25, y: 76, rating: 1500, date: 'Mar 16, 2025', name: 'Weekly Contest 441', rank: '18,450', solved: '2 / 4', trend: 'up' },
        { x: 75, y: 94, rating: 1465, date: 'Apr 06, 2025', name: 'Biweekly Contest 153', rank: '21,200', solved: '1 / 4', trend: 'down' },
        { x: 125, y: 74, rating: 1505, date: 'May 18, 2025', name: 'Weekly Contest 450', rank: '16,800', solved: '2 / 4', trend: 'up' },
        { x: 175, y: 104, rating: 1445, date: 'Jun 22, 2025', name: 'Weekly Contest 455', rank: '22,100', solved: '1 / 4', trend: 'down' },
        { x: 225, y: 115, rating: 1425, date: 'Jul 13, 2025', name: 'Biweekly Contest 160', rank: '23,500', solved: '1 / 4', trend: 'down' },
        { x: 275, y: 110, rating: 1435, date: 'Aug 24, 2025', name: 'Weekly Contest 464', rank: '20,400', solved: '2 / 4', trend: 'up' },
        { x: 325, y: 107, rating: 1440, date: 'Sep 14, 2025', name: 'Weekly Contest 467', rank: '19,800', solved: '2 / 4', trend: 'up' },
        { x: 375, y: 112, rating: 1430, date: 'Oct 19, 2025', name: 'Biweekly Contest 167', rank: '21,000', solved: '1 / 4', trend: 'down' },
        { x: 425, y: 102, rating: 1450, date: 'Nov 09, 2025', name: 'Weekly Contest 475', rank: '18,900', solved: '2 / 4', trend: 'up' },
        { x: 475, y: 76, rating: 1500, date: 'Dec 21, 2025', name: 'Weekly Contest 481', rank: '16,500', solved: '2 / 4', trend: 'up' },
        { x: 525, y: 53, rating: 1545, date: 'Jan 18, 2026', name: 'Weekly Contest 485', rank: '14,200', solved: '3 / 4', trend: 'up' },
        { x: 575, y: 32, rating: 1586, date: 'Feb 15, 2026', name: 'Biweekly Contest 175', rank: '11,800', solved: '3 / 4', trend: 'up', isPeak: true },
        { x: 625, y: 65, rating: 1522, date: 'Aug 02, 2026', name: 'Weekly Contest 513', rank: '15,202', solved: '2 / 4', trend: 'down' },
        { x: 675, y: 48, rating: 1555, date: 'Aug 30, 2026', name: 'Weekly Contest 517', rank: '13,500', solved: '3 / 4', trend: 'up' }
    ];

    useEffect(() => {
        let isMounted = true;
        // Fetch live LeetCode stats with fallback
        fetch('https://alfa-leetcode-api.onrender.com/Kishore2008/solved')
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (isMounted && data && data.solvedProblem) {
                    setLeetcodeData((prev) => ({
                        ...prev,
                        solvedProblem: data.solvedProblem || prev.solvedProblem,
                        easySolved: data.easySolved || prev.easySolved,
                        mediumSolved: data.mediumSolved || prev.mediumSolved,
                        hardSolved: data.hardSolved || prev.hardSolved
                    }));
                }
            })
            .catch(() => {});

        // Fetch live GitHub User details
        fetch('https://api.github.com/users/KiShOrE-2008')
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (isMounted && data) {
                    setGithubStats((prev) => ({
                        ...prev,
                        publicRepos: data.public_repos ?? prev.publicRepos,
                        followers: data.followers ?? prev.followers
                    }));
                }
            })
            .catch(() => {});

        return () => { isMounted = false; };
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeModal]);

    const totalProblemsAvailable = 4046;
    const easyPercentage = Number(((leetcodeData.easySolved / 963) * 100).toFixed(1)) || 17.4;
    const mediumPercentage = Number(((leetcodeData.mediumSolved / 2111) * 100).toFixed(1)) || 3.6;
    const hardPercentage = Number(((leetcodeData.hardSolved / 972) * 100).toFixed(1)) || 0.6;
    const totalProgressPercent = Number(((leetcodeData.solvedProblem / totalProblemsAvailable) * 100).toFixed(1)) || 6.2;


    const activeContestPoint = hoveredContestIndex !== null ? contestHistory[hoveredContestIndex] : null;

    // 100% Precise SVG coordinate calibration using BoundingClientRect & viewBox ratio
    const handleSvgMouseMove = (e) => {
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        if (!rect.width) return;
        
        // Calculate exact relative X ratio across SVG element (0.0 to 1.0)
        const relativeX = (e.clientX - rect.left) / rect.width;
        // Map ratio directly to SVG viewBox coordinate system (0 to 700)
        const viewBoxX = Math.max(0, Math.min(700, relativeX * 700));

        let closestIdx = 0;
        let minDistance = Math.abs(contestHistory[0].x - viewBoxX);
        for (let i = 1; i < contestHistory.length; i++) {
            const dist = Math.abs(contestHistory[i].x - viewBoxX);
            if (dist < minDistance) {
                minDistance = dist;
                closestIdx = i;
            }
        }
        setHoveredContestIndex(closestIdx);
    };

    return (
        <div ref={activityRef} className="coding-activity-container-inner" style={{ width: '100%' }}>
            <section className="activity-container">
            <div className="section-header">
                <h2 className="section-title">Coding & Contribution Activity</h2>
                <div className="section-divider"></div>
            </div>

            {/* TWO MAIN PLATFORM BOXES */}
            <div className="platform-boxes-grid">
                {/* GITHUB MAIN BOX */}
                <div
                    className="platform-card github-card"
                    onClick={() => setActiveModal('github')}
                    data-aos="fade-right"
                >
                    <div className="platform-card-glowing-bg"></div>
                    <div className="platform-header">
                        <div className="platform-icon-wrap gh-bg">
                            <GitHubIcon size={24} fill="#7dcfff" />
                        </div>
                        <div className="platform-title-info">
                            <h3>GitHub Overview</h3>
                            <span className="platform-handle">@KiShOrE-2008</span>
                        </div>
                        <span className="click-hint-badge">
                            Click for Full Stats <i className="fas fa-expand-alt"></i>
                        </span>
                    </div>

                    <div className="platform-summary-stats">
                        <div className="p-stat">
                            <span className="p-val">{githubStats.totalCommits}+</span>
                            <span className="p-lbl">Commits</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val">{githubStats.publicRepos}</span>
                            <span className="p-lbl">Public Repos</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val">{githubStats.totalStars}</span>
                            <span className="p-lbl">Stars</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val text-purple">{githubStats.grade}</span>
                            <span className="p-lbl">Git Rating</span>
                        </div>
                    </div>

                    <div className="platform-card-footer">
                        <span className="profile-url-preview">
                            <i className="fas fa-link"></i> github.com/KiShOrE-2008
                        </span>
                        <button className="view-modal-btn gh-btn">
                            View Detailed Analytics <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

                {/* LEETCODE MAIN BOX */}
                <div
                    className="platform-card leetcode-card"
                    onClick={() => setActiveModal('leetcode')}
                    data-aos="fade-left"
                >
                    <div className="platform-card-glowing-bg"></div>
                    <div className="platform-header">
                        <div className="platform-icon-wrap lc-bg">
                            <LeetCodeIcon size={24} />
                        </div>
                        <div className="platform-title-info">
                            <h3>LeetCode Overview</h3>
                            <span className="platform-handle">@Kishore2008</span>
                        </div>
                        <span className="click-hint-badge">
                            Click for Full Stats <i className="fas fa-expand-alt"></i>
                        </span>
                    </div>

                    <div className="platform-summary-stats">
                        <div className="p-stat">
                            <span className="p-val text-green">{leetcodeData.solvedProblem}</span>
                            <span className="p-lbl">Problems Solved</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val text-amber">{leetcodeData.contestRating}</span>
                            <span className="p-lbl">Contest Rating</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val">{leetcodeData.ranking.toLocaleString()}</span>
                            <span className="p-lbl">Global Rank</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val text-cyan">{leetcodeData.topPercentage}</span>
                            <span className="p-lbl">Top %</span>
                        </div>
                    </div>

                    <div className="platform-card-footer">
                        <span className="profile-url-preview">
                            <i className="fas fa-link"></i> leetcode.com/u/Kishore2008
                        </span>
                        <button className="view-modal-btn lc-btn">
                            View Detailed Analytics <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Live Sync Footer */}
            <div className="activity-footer-sync">
                <span className="sync-pulse"></span>
                <span>Live Synchronized with GitHub & LeetCode APIs</span>
            </div>

            {/* ==========================================
               GITHUB DETAILED MODAL POP-UP
               ========================================== */}
            {activeModal === 'github' && createPortal(
                <div className="activity-modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="activity-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="activity-modal-header gh-modal-header">
                            <div className="modal-title-wrap">
                                <GitHubIcon size={26} className="modal-title-icon" fill="#7dcfff" />
                                <div>
                                    <h3>GitHub Activity & Analytics</h3>
                                    <a
                                        href="https://github.com/KiShOrE-2008"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-profile-link"
                                    >
                                        <i className="fas fa-external-link-alt"></i> https://github.com/KiShOrE-2008
                                    </a>
                                </div>
                            </div>
                            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="activity-modal-body">
                            <div className="modal-grid">
                                {/* GitHub Stats Card */}
                                <div className="modal-inner-card">
                                    <div className="inner-card-title">
                                        <i className="fas fa-chart-bar text-purple"></i> Profile Statistics
                                    </div>
                                    <div className="gh-native-body">
                                        <div className="gh-metrics-list">
                                            <div className="gh-metric-row">
                                                <span><i className="far fa-star text-purple"></i> Total Stars Earned:</span>
                                                <strong>{githubStats.totalStars}</strong>
                                            </div>
                                            <div className="gh-metric-row">
                                                <span><i className="fas fa-history text-cyan"></i> Total Commits:</span>
                                                <strong>{githubStats.totalCommits}</strong>
                                            </div>
                                            <div className="gh-metric-row">
                                                <span><i className="fas fa-code-branch text-purple"></i> Total PRs:</span>
                                                <strong>{githubStats.totalPRs}</strong>
                                            </div>
                                            <div className="gh-metric-row">
                                                <span><i className="fas fa-code-merge text-cyan"></i> Merged PRs %:</span>
                                                <strong>{githubStats.mergedPRPercent}</strong>
                                            </div>
                                            <div className="gh-metric-row">
                                                <span><i className="fas fa-folder text-blue"></i> Public Repositories:</span>
                                                <strong>{githubStats.publicRepos}</strong>
                                            </div>
                                            <div className="gh-metric-row">
                                                <span><i className="fas fa-users text-purple"></i> Followers:</span>
                                                <strong>{githubStats.followers}</strong>
                                            </div>
                                        </div>
                                        <div className="gh-grade-badge">
                                            <div className="grade-circle">
                                                <span>{githubStats.grade}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* GitHub Commit Streak */}
                                <div className="modal-inner-card">
                                    <div className="inner-card-title">
                                        <i className="fas fa-fire text-green"></i> Commit Streak
                                    </div>
                                    <div className="image-card-body">
                                        <img
                                            src="https://github-readme-streak-stats.herokuapp.com/?user=KiShOrE-2008&theme=tokyonight&hide_border=true&background=0d1117&ring=39d353&fire=39d353&currStreakNum=39d353"
                                            alt="Kishore's GitHub Streak"
                                            className="stat-card-img"
                                        />
                                    </div>
                                </div>

                                {/* Most Used Languages */}
                                <div className="modal-inner-card full-span">
                                    <div className="inner-card-title">
                                        <i className="fas fa-laptop-code text-purple"></i> Most Used Languages Breakdown
                                    </div>
                                    <div className="lang-native-body">
                                        <div className="lang-stacked-bar">
                                            {githubStats.languages.map((lang) => (
                                                <div
                                                    key={lang.name}
                                                    className="lang-bar-segment"
                                                    style={{
                                                        width: `${lang.percent}%`,
                                                        backgroundColor: lang.color
                                                    }}
                                                    title={`${lang.name}: ${lang.percent}%`}
                                                ></div>
                                            ))}
                                        </div>
                                        <div className="lang-legend-grid">
                                            {githubStats.languages.map((lang) => (
                                                <div key={lang.name} className="lang-legend-item">
                                                    <span className="lang-dot" style={{ backgroundColor: lang.color }}></span>
                                                    <span className="lang-name">{lang.name}</span>
                                                    <span className="lang-pct">{lang.percent}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Git Contribution Chart */}
                                <div className="modal-inner-card full-span">
                                    <div className="inner-card-title">
                                        <i className="fas fa-calendar-alt text-green"></i> Annual Contribution Heatmap
                                    </div>
                                    <div className="graph-card-body">
                                        <img
                                            src="https://ghchart.rshah.org/39d353/KiShOrE-2008"
                                            alt="Kishore's Contribution Chart"
                                            className="activity-graph-img gh-chart-styled"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="activity-modal-footer">
                            <a
                                href="https://github.com/KiShOrE-2008"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-primary-btn gh-btn"
                            >
                                <GitHubIcon size={18} fill="currentColor" /> {"Visit GitHub Profile ↗"}
                            </a>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* ==========================================
               LEETCODE DETAILED MODAL POP-UP
               ========================================== */}
            {activeModal === 'leetcode' && createPortal(
                <div className="activity-modal-overlay" onClick={() => setActiveModal(null)}>
                    <div className="activity-modal-content" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="activity-modal-header lc-modal-header">
                            <div className="modal-title-wrap">
                                <LeetCodeIcon size={26} className="modal-title-icon" />
                                <div>
                                    <h3>LeetCode Activity & Problem Solving</h3>
                                    <a
                                        href="https://leetcode.com/u/Kishore2008/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-profile-link"
                                    >
                                        <i className="fas fa-external-link-alt"></i> https://leetcode.com/u/Kishore2008/
                                    </a>
                                </div>
                            </div>
                            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="activity-modal-body">
                            <div className="modal-grid">
                                {/* Contest Rating History Line Graph with Precise Hover Tooltip & Calibrated Cursor */}
                                <div className="modal-inner-card full-span">
                                    <div className="inner-card-title">
                                        <i className="fas fa-chart-line text-amber"></i> Contest Rating Progression & History
                                        <span className="hover-hint-tag"><i className="fas fa-mouse-pointer"></i> Glide mouse over graph</span>
                                    </div>
                                    <div className="lc-contest-graph-container">
                                        {/* Dynamic Header: Swaps on Hover */}
                                        <div className="lc-graph-top-header">
                                            {activeContestPoint ? (
                                                <>
                                                    <div className="lc-graph-stat fade-in-stat">
                                                        <span className="lc-graph-label">Contest Rating</span>
                                                        <span className="lc-graph-value text-amber">
                                                            {activeContestPoint.rating}
                                                            {activeContestPoint.trend === 'up' ? (
                                                                <span className="trend-arrow text-green"> ↗</span>
                                                            ) : (
                                                                <span className="trend-arrow text-red"> ↘</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="lc-graph-stat fade-in-stat">
                                                        <span className="lc-graph-label">{activeContestPoint.date}</span>
                                                        <span className="lc-graph-value text-slate">{activeContestPoint.name}</span>
                                                    </div>
                                                    <div className="lc-graph-stat fade-in-stat">
                                                        <span className="lc-graph-label">Rank</span>
                                                        <span className="lc-graph-value">{activeContestPoint.rank}</span>
                                                    </div>
                                                    <div className="lc-graph-stat fade-in-stat">
                                                        <span className="lc-graph-label">Solved</span>
                                                        <span className="lc-graph-value text-cyan">{activeContestPoint.solved}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="lc-graph-stat">
                                                        <span className="lc-graph-label">Contest Rating</span>
                                                        <span className="lc-graph-value text-amber">1,555</span>
                                                    </div>
                                                    <div className="lc-graph-stat">
                                                        <span className="lc-graph-label">Global Ranking</span>
                                                        <span className="lc-graph-value">275,163 <small>{"/ 881,221"}</small></span>
                                                    </div>
                                                    <div className="lc-graph-stat">
                                                        <span className="lc-graph-label">Attended</span>
                                                        <span className="lc-graph-value">23</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <div className="lc-svg-graph-wrapper">
                                            <svg
                                                viewBox="0 0 700 150"
                                                preserveAspectRatio="none"
                                                className="lc-contest-svg interactive-smooth-svg"
                                                onMouseMove={handleSvgMouseMove}
                                                onMouseLeave={() => setHoveredContestIndex(null)}
                                            >
                                                <defs>
                                                    <linearGradient id="amberGlow" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.38" />
                                                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                                                    </linearGradient>
                                                </defs>

                                                {/* Full-width transparent overlay rectangle for 100% reliable mouse hover tracking */}
                                                <rect
                                                    x="0"
                                                    y="0"
                                                    width="700"
                                                    height="150"
                                                    fill="transparent"
                                                    style={{ pointerEvents: 'all' }}
                                                />

                                                {/* Silky Smooth Cubic Bezier Gradient Fill Area */}
                                                <path
                                                    d="M 25 76 C 50 76, 50 94, 75 94 C 100 94, 100 74, 125 74 C 150 74, 150 104, 175 104 C 200 104, 200 115, 225 115 C 250 115, 250 110, 275 110 C 300 110, 300 107, 325 107 C 350 107, 350 112, 375 112 C 400 112, 400 102, 425 102 C 450 102, 450 76, 475 76 C 500 76, 500 53, 525 53 C 550 53, 550 32, 575 32 C 600 32, 600 65, 625 65 C 650 65, 650 48, 675 48 L 675 135 L 25 135 Z"
                                                    fill="url(#amberGlow)"
                                                />

                                                {/* Silky Smooth Cubic Bezier Rating Stroke Curve */}
                                                <path
                                                    d="M 25 76 C 50 76, 50 94, 75 94 C 100 94, 100 74, 125 74 C 150 74, 150 104, 175 104 C 200 104, 200 115, 225 115 C 250 115, 250 110, 275 110 C 300 110, 300 107, 325 107 C 350 107, 350 112, 375 112 C 400 112, 400 102, 425 102 C 450 102, 450 76, 475 76 C 500 76, 500 53, 525 53 C 550 53, 550 32, 575 32 C 600 32, 600 65, 625 65 C 650 65, 650 48, 675 48"
                                                    fill="none"
                                                    stroke="#f59e0b"
                                                    strokeWidth="2.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />

                                                {/* Static Peak point white dot */}
                                                <circle cx="575" cy="32" r="4.5" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />

                                                {/* Static Peak rating tooltip badge */}
                                                {!activeContestPoint && (
                                                    <g transform="translate(550, 44)">
                                                        <rect x="0" y="0" width="50" height="24" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="rgba(245, 158, 11, 0.4)" />
                                                        <text x="25" y="16" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="700">1,586</text>
                                                    </g>
                                                )}

                                                {/* SILKY SMOOTH HARDWARE-ACCELERATED HOVER GRAPHICS */}
                                                {activeContestPoint && (
                                                    <g className="smooth-hover-graphics">
                                                        {/* Vertical Cursor Line extending downwards from active dot to bottom axis */}
                                                        <line
                                                            className="smooth-cursor-line"
                                                            x1={activeContestPoint.x}
                                                            y1={activeContestPoint.y}
                                                            x2={activeContestPoint.x}
                                                            y2="135"
                                                            stroke="#f59e0b"
                                                            strokeWidth="1.5"
                                                            strokeDasharray="3 3"
                                                            opacity="0.9"
                                                        />
                                                        {/* Translucent Glowing Halo around active node */}
                                                        <circle
                                                            className="smooth-halo-circle"
                                                            cx={activeContestPoint.x}
                                                            cy={activeContestPoint.y}
                                                            r="11"
                                                            fill="rgba(245, 158, 11, 0.3)"
                                                            stroke="#f59e0b"
                                                            strokeWidth="1.5"
                                                        />
                                                        {/* Active Center Dot */}
                                                        <circle
                                                            className="smooth-center-dot"
                                                            cx={activeContestPoint.x}
                                                            cy={activeContestPoint.y}
                                                            r="4.5"
                                                            fill="#ffffff"
                                                            stroke="#f59e0b"
                                                            strokeWidth="2.5"
                                                        />
                                                        {/* Dynamic Floating Rating Badge above Active Point */}
                                                        <g transform={`translate(${Math.max(10, Math.min(640, activeContestPoint.x - 25))}, ${Math.max(6, activeContestPoint.y - 32)})`}>
                                                            <rect x="0" y="0" width="50" height="22" rx="6" fill="rgba(15, 23, 42, 0.95)" stroke="#f59e0b" strokeWidth="1" />
                                                            <text x="25" y="15" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="700">
                                                                {activeContestPoint.rating}
                                                            </text>
                                                        </g>
                                                    </g>
                                                )}

                                                {/* X Axis Years */}
                                                <text x="25" y="142" fill="#94a3b8" fontSize="12" fontWeight="500">2025</text>
                                                <text x="675" y="142" textAnchor="end" fill="#94a3b8" fontSize="12" fontWeight="500">2026</text>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Problem Solving Card */}
                                <div className="modal-inner-card">
                                    <div className="inner-card-title">
                                        <i className="fas fa-check-circle text-green"></i> Problem Solving Breakdown
                                    </div>
                                    <div className="leetcode-custom-body">
                                        <div className="lc-main-stat">
                                            {/* Left side total circular progress ring */}
                                            <div className="lc-circle-wrapper">
                                                <svg className="lc-ring" viewBox="0 0 36 36">
                                                    <path
                                                        className="circle-bg"
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                    <path
                                                        className="circle-easy"
                                                        strokeDasharray={`${totalProgressPercent}, 100`}
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    />
                                                </svg>
                                                <div className="lc-circle-text">
                                                    <span className="lc-count">{leetcodeData.solvedProblem}</span>
                                                    <span className="lc-total">/ {totalProblemsAvailable}</span>
                                                    <span className="lc-label">SOLVED</span>
                                                </div>
                                            </div>

                                            {/* Right side linear difficulty progress bars */}
                                            <div className="lc-difficulty-list">
                                                <div className="lc-diff-item easy">
                                                    <div className="diff-header">
                                                        <span className="diff-name">Easy</span>
                                                        <span className="diff-val">{leetcodeData.easySolved} <small>{"/ 963"}</small></span>
                                                    </div>
                                                    <div className="diff-bar-bg">
                                                        <div className="diff-bar-fill easy-fill" style={{ width: `${easyPercentage}%` }}></div>
                                                    </div>
                                                </div>

                                                <div className="lc-diff-item medium">
                                                    <div className="diff-header">
                                                        <span className="diff-name">Medium</span>
                                                        <span className="diff-val">{leetcodeData.mediumSolved} <small>{"/ 2111"}</small></span>
                                                    </div>
                                                    <div className="diff-bar-bg">
                                                        <div className="diff-bar-fill medium-fill" style={{ width: `${mediumPercentage}%` }}></div>
                                                    </div>
                                                </div>

                                                <div className="lc-diff-item hard">
                                                    <div className="diff-header">
                                                        <span className="diff-name">Hard</span>
                                                        <span className="diff-val">{leetcodeData.hardSolved} <small>{"/ 972"}</small></span>
                                                    </div>
                                                    <div className="diff-bar-bg">
                                                        <div className="diff-bar-fill hard-fill" style={{ width: `${hardPercentage}%`, minWidth: '4px' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contest Rating Overview */}
                                <div className="modal-inner-card">
                                    <div className="inner-card-title">
                                        <i className="fas fa-trophy text-amber"></i> Contest Rating Overview
                                    </div>
                                    <div className="leetcode-contest-body">
                                        <div className="contest-stats-row">
                                            <div className="c-stat-box">
                                                <span className="c-label">Contest Rating</span>
                                                <span className="c-val text-amber">{leetcodeData.contestRating}</span>
                                            </div>
                                            <div className="c-stat-box">
                                                <span className="c-label">Global Ranking</span>
                                                <span className="c-val">{leetcodeData.ranking.toLocaleString()}</span>
                                            </div>
                                            <div className="c-stat-box">
                                                <span className="c-label">Top Percentile</span>
                                                <span className="c-val text-cyan">{leetcodeData.topPercentage}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="activity-modal-footer">
                            <a
                                href="https://leetcode.com/u/Kishore2008/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="modal-primary-btn lc-btn"
                            >
                                <LeetCodeIcon size={18} /> {"Visit LeetCode Profile ↗"}
                            </a>
                        </div>
                    </div>
                </div>,
                document.body
            )}
            </section>
        </div>
    );
}
