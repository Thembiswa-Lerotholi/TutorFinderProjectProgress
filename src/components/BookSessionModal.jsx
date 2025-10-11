import { useState } from 'react';

export default function BookSessionModal({ tutor, isOpen, onClose, onSubmit }) {
  const [booking, setBooking] = useState({
    subject: tutor.expertise?.split(',')[0] || 'General',
    sessionDate: '',
    sessionTime: '',
    duration: '60',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...booking,
      tutorId: tutor.id,
      tutorName: tutor.name,
      price: tutor.price
    });
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md border border-purple-500/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Book Session with {tutor.name}</h2>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Subject
            </label>
            <select
              name="subject"
              value={booking.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {tutor.expertise ? (
                tutor.expertise.split(',').map((subject, index) => (
                  <option key={index} value={subject.trim()}>
                    {subject.trim()}
                  </option>
                ))
              ) : (
                <option value="General">General Tutoring</option>
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Date
              </label>
              <input
                type="date"
                name="sessionDate"
                value={booking.sessionDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Time
              </label>
              <input
                type="time"
                name="sessionTime"
                value={booking.sessionTime}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Duration (minutes)
            </label>
            <select
              name="duration"
              value={booking.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={booking.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any specific topics or areas you want to focus on?"
              className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
            <p className="text-purple-200 text-sm">
              <strong>Rate:</strong> ${tutor.price}/hour
            </p>
            <p className="text-purple-200 text-sm">
              <strong>Estimated cost:</strong> ${(tutor.price * (parseInt(booking.duration) / 60)).toFixed(2)}
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 hover:bg-purple-900/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg transition-colors"
            >
              Book Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}