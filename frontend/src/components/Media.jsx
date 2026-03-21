import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FiX, FiMaximize } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const mediaItems = [
  { id: 1, title: 'FOREVER — E-Commerce',         type: 'image', image: '/projects/ecommerce.png',  emoji: '🛒' },
  { id: 2, title: 'QuickGPT — AI Assistant',       type: 'image', image: '/projects/quickgpt.png',   emoji: '🤖' },
  { id: 3, title: 'PyGenix — Python Code Runner',  type: 'image', image: '/projects/pygenix.png',    emoji: '🐍' },
  { id: 4, title: 'This Portfolio',                type: 'image', image: '/projects/portfolio.png',  emoji: '🚀' },
  { id: 5, title: 'MCA Public School',             type: 'image', image: '/projects/school.png',     emoji: '🏫' },
  { id: 6, title: 'Weather Dashboard',             type: 'image', image: '/projects/weather.png',    emoji: '🌤️' },
];

const MediaThumb = ({ item, onClick, index }) => (
  <motion.div
    className="card rounded-xl overflow-hidden cursor-pointer group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    onClick={() => onClick(item)}
    whileHover={{ scale: 1.02 }}
  >
    <div className="aspect-video bg-[#0d0d0d] border-b border-white/[0.05] flex items-center justify-center relative overflow-hidden">
      {item.image ? (
        <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
      ) : (
        <span className="text-4xl opacity-50">{item.emoji}</span>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <FiMaximize className="text-white/80" size={20} />
      </div>
    </div>
    <div className="p-3 flex items-center justify-between">
      <p className="text-white/50 text-xs truncate">{item.title}</p>
      <span className="text-white/20 text-[10px] ml-2">{item.type === 'video' ? '▶ video' : '🖼'}</span>
    </div>
  </motion.div>
);

const Modal = ({ item, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="card rounded-2xl overflow-hidden max-w-3xl w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="aspect-video bg-[#0d0d0d] flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
        ) : (
          <span className="text-8xl opacity-40">{item.emoji}</span>
        )}
      </div>
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3 className="text-white text-base font-semibold">{item.title}</h3>
          <p className="text-white/30 text-xs mt-1">Project Screenshot</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white/40 hover:text-white transition-colors">
          <FiX size={16} />
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Media = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState(null);

  return (
    <section id="media" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3">Visuals</p>
          <h2 className="section-title text-white">Media Gallery</h2>
          <div className="divider mt-4" />
        </motion.div>

        {/* Swiper */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-10"
          >
            {mediaItems.map(item => (
              <SwiperSlide key={item.id}>
                <div className="card rounded-xl overflow-hidden cursor-pointer group" onClick={() => setSelected(item)}>
                  <div className="aspect-video bg-[#0d0d0d] flex items-center justify-center relative border-b border-white/[0.05] overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                    ) : (
                      <span className="text-4xl opacity-40">{item.emoji}</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <FiMaximize className="text-white/70" size={18} />
                    </div>
                  </div>
                  <div className="p-3"><p className="text-white/40 text-xs truncate">{item.title}</p></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mediaItems.map((item, i) => <MediaThumb key={item.id} item={item} index={i} onClick={setSelected} />)}
        </div>
      </div>

      <AnimatePresence>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Media;
