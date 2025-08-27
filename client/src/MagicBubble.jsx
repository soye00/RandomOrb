import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Particles from 'react-tsparticles';
import './MagicBubble.css';

export default function MagicBubble() {
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const controls = useAnimation(); // 애니메이션 제어

    useEffect(() => {
        fetch('/answers.json')
            .then(res => {
                if (!res.ok) throw new Error('JSON 로드 실패');
                return res.json();
            })
            .then(data => setAnswers(data))
            .catch(err => console.error(err));
    }, []);

    const handleDoubleClick = async () => {
        if (answers.length === 0 || showAnswer) return;

        await controls.start({ scale: 1.1, transition: { duration: 0.3 } });
        await controls.start({ scale: 1, transition: { duration: 0.3 } });

        const rand = answers[Math.floor(Math.random() * answers.length)];
        setAnswer(rand);
        setShowAnswer(true);
    };

    const handleReset = () => {
        setAnswer('');
        setShowAnswer(false);
    };

    return (
        <div className="ball-container">
            <div className="instruction">고민을 생각하면서 두번 터치하세요</div>
            <motion.div
                className="crystal-ball"
                onDoubleClick={handleDoubleClick}
                onTouchStart={handleDoubleClick} // 모바일 터치 지원
                animate={controls}
                initial={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {showAnswer && <div className="answer-text">{answer}</div>}
                <Particles
                    options={{
                        particles: {
                            number: { value: 20 },
                            size: { value: 2, random: { enable: true, minimumValue: 1 } },
                            color: { value: "#ffffff" },
                            move: {
                                enable: true,
                                speed: 0.5,
                                direction: "none",
                                random: true,
                                outModes: { default: "bounce" }
                            },
                            opacity: { value: 0.5, random: { enable: true, minimumValue: 0.3 } },
                            shape: { type: "circle" }
                        },
                        fullScreen: { enable: false },
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%'
                        }
                    }}
                />
            </motion.div>
            {showAnswer && (
                <button className="reset-button" onClick={handleReset}>
                    다시
                </button>
            )}
            <Particles
                options={{
                    particles: {
                        number: { value: 30 },
                        size: { value: 3 },
                        color: { value: "#ffffff" },
                        move: { enable: true, speed: 1, outModes: "bounce" },
                        opacity: { value: 0.7 },
                        shape: { type: "circle" }
                    },
                    fullScreen: { enable: false }
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
}