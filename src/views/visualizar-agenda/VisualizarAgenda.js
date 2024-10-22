import { format, getDay, parse, startOfWeek } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTrash } from 'react-icons/fa'; // Importa o ícone de exclusão
import './styles.css';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

const VisualizarAgenda = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Reunião',
      subject: 'Reunião de Planejamento',
      start: new Date(2024, 9, 22, 10, 0),
      end: new Date(2024, 9, 22, 11, 0),
    },
    {
      id: 2,
      title: 'Intervalo para Almoço',
      subject: 'Intervalo para Almoço',
      start: new Date(2024, 9, 23, 12, 0),
      end: new Date(2024, 9, 23, 13, 0),
    },
  ]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({ event, start, end }) => {
    const updatedEvents = events.map(existingEvent =>
      existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleNewEvent = slotInfo => {
    const title = prompt('Nome do evento:');
    const subject = prompt('Descrição do evento:');
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        subject: subject || '',
        start: slotInfo.start,
        end: slotInfo.end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventSelect = event => {
    alert(`Evento: ${event.title}\nDescrição: ${event.subject || 'Sem descrição'}`);
  };

  const handleDeleteEvent = eventId => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      setEvents(events.filter(event => event.id !== eventId));
    }
  };

  const eventRenderer = ({ event }) => (
    <div className="event-content">
      <span>{event.title}</span>
      <FaTrash
        className="delete-icon"
        onClick={(e) => {
          e.stopPropagation(); // Evita a seleção do evento ao clicar no ícone
          handleDeleteEvent(event.id);
        }}
      />
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="calendar-container">
        <DragAndDropCalendar
          localizer={localizer}
          culture="pt-BR"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh'}}
          draggableAccessor={() => true}
          onEventDrop={handleEventDrop}
          resizable
          onEventResize={handleEventResize}
          selectable
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleNewEvent}
          components={{
            event: eventRenderer, 
          }}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda Completa",
            date: "Data",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Não há eventos neste intervalo.",
            showMore: total => `+ Ver mais (${total})`,
            allDay: "Dia inteiro",
          }}
        />
      </div>
    </DndProvider>
  );
};

export default VisualizarAgenda;
