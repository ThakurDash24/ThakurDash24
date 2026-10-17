import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

// A slowly auto-rotating wireframe globe, draggable, paused off-screen.
// Trimmed down from a larger reference component to just what this site
// uses: one visual variant, no city-rotation, no projection morph.
const GlobeWireframe = ({
    className = '',
    strokeColor = 'var(--accent-gold)',
    autoRotateSpeed = 0.25,
}) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [worldData, setWorldData] = useState([]);
    const [rotation, setRotation] = useState([0, -10]);
    const [isDragging, setIsDragging] = useState(false);
    const lastMouse = useRef([0, 0]);
    const [isVisible, setIsVisible] = useState(false);
    const [size, setSize] = useState(0);
    const animationFrame = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateSize = () => setSize(container.offsetWidth || 0);
        updateSize();

        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(container);

        const intersectionObserver = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        intersectionObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then((res) => res.json())
            .then((world) => {
                const countries = feature(world, world.objects.countries).features;
                setWorldData(countries);
            })
            .catch(() => setWorldData([]));
    }, []);

    useEffect(() => {
        if (!isVisible || isDragging) {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
            return;
        }
        const rotate = () => {
            setRotation((prev) => [(prev[0] + autoRotateSpeed) % 360, prev[1]]);
            animationFrame.current = requestAnimationFrame(rotate);
        };
        animationFrame.current = requestAnimationFrame(rotate);
        return () => {
            if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
        };
    }, [isVisible, isDragging, autoRotateSpeed]);

    useEffect(() => {
        if (!svgRef.current || worldData.length === 0 || !isVisible || size === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const projection = d3
            .geoOrthographic()
            .scale(size * 0.46)
            .translate([size / 2, size / 2])
            .rotate(rotation)
            .precision(0.1);

        const path = d3.geoPath().projection(projection);

        svg
            .selectAll('.country')
            .data(worldData)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', (d) => path(d) || '')
            .attr('fill', 'none')
            .attr('stroke', strokeColor)
            .attr('stroke-width', 0.6)
            .attr('opacity', 0.85);

        const sphereOutline = path({ type: 'Sphere' });
        if (sphereOutline) {
            svg
                .append('path')
                .attr('d', sphereOutline)
                .attr('fill', 'none')
                .attr('stroke', strokeColor)
                .attr('stroke-width', 1)
                .attr('opacity', 0.9);
        }
    }, [worldData, rotation, isVisible, size, strokeColor]);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        const rect = svgRef.current.getBoundingClientRect();
        lastMouse.current = [e.clientX - rect.left, e.clientY - rect.top];
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        const rect = svgRef.current.getBoundingClientRect();
        const current = [e.clientX - rect.left, e.clientY - rect.top];
        const dx = current[0] - lastMouse.current[0];
        const dy = current[1] - lastMouse.current[1];
        setRotation((prev) => [prev[0] + dx * 0.4, Math.max(-90, Math.min(90, prev[1] - dy * 0.4))]);
        lastMouse.current = current;
    };

    const stopDragging = () => setIsDragging(false);

    return (
        <div ref={containerRef} className={className} style={{ aspectRatio: '1 / 1', width: '100%' }}>
            <svg
                ref={svgRef}
                width={size}
                height={size}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                style={{ cursor: isDragging ? 'grabbing' : 'grab', display: 'block' }}
            />
        </div>
    );
};

export default GlobeWireframe;
