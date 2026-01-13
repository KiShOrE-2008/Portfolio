document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('profileCard');

    // Simple 3D Tilt Effect
    document.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 20; // range -10 to 10
        const y = (e.clientY / innerHeight - 0.5) * 20; // range -10 to 10

        card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });

    // Add smooth transition for the tilt only when not moving (to snap back)
    // or keep it raw for responsiveness. 
    // Let's add a slight transition in CSS for smooth reset if needed, 
    // but for active tilt, we want instant response.
    // However, since we defined 'transform' in CSS animation 'fadeInUp', 
    // we need to be careful not to conflict after animation ends.
    // The animation fill-mode is forwards, so it sets transform to translateY(0).
    // We'll wait for animation to finish before enabling tilt.

    setTimeout(() => {
        card.style.transition = 'transform 0.1s ease-out';
    }, 1000);
});
