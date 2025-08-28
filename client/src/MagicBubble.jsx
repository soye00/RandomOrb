import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
                animate={controls}
                initial={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <img src="/orbw.png" alt="Magic Orb" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                {showAnswer && <div className="answer-text">{answer}</div>}
            </motion.div>
            {showAnswer && (
                <button className="reset-button" onClick={handleReset}>
                    다시
                </button>
            )}
        </div>
    );
}