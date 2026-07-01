import { useMemo, useState } from 'react';

import './App.css';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import CompletedTaskList from './components/CompletedTaskList/CompletedTaskList.jsx';
import Footer from './components/Footer/Footer.jsx';

const initialDraft = {
	title: '',
	priority: 'low',
	date: '',
};

const initialSections = {
	taskForm: true,
	taskList: false,
	completedTaskList: false,
};

const priorityWeights = {
	high: 1,
	medium: 2,
	low: 3,
};

function sortTasks(tasks, criteria) {
	return [...tasks].sort((first, second) => {
		if (criteria === 'priority') {
			return priorityWeights[first.priority] - priorityWeights[second.priority];
		}

		return new Date(first.date) - new Date(second.date);
	});
}

function normalizeDateString(value) {
	if (!value) {
		return null;
	}

	const trimmedValue = value.trim();
	if (trimmedValue.length !== 10) {
		return null;
	}

	if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(trimmedValue)) {
		const [year, month, day] = trimmedValue.split('-').map(Number);
		const date = new Date(year, month - 1, day);
		if (
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day
		) {
			return trimmedValue;
		}
		return null;
	}

	if (/^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(trimmedValue)) {
		const [day, month, year] = trimmedValue.split('.').map(Number);
		const date = new Date(year, month - 1, day);
		if (
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day
		) {
			return `${year.toString().padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		}
		return null;
	}

	return null;
}

function createTaskId() {
	if (
		typeof crypto !== 'undefined' &&
		typeof crypto.randomUUID === 'function'
	) {
		return crypto.randomUUID();
	}

	return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function App() {
	const [openSection, setOpenSection] = useState(initialSections);
	const [draft, setDraft] = useState(initialDraft);
	const [activeTasks, setActiveTasks] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [activeSortBy, setActiveSortBy] = useState('date');
	const [completedSortBy, setCompletedSortBy] = useState('date');

	const visibleActiveTasks = useMemo(
		() => sortTasks(activeTasks, activeSortBy),
		[activeTasks, activeSortBy],
	);

	const visibleCompletedTasks = useMemo(
		() => sortTasks(completedTasks, completedSortBy),
		[completedTasks, completedSortBy],
	);

	function handleToggleSection(sectionId) {
		setOpenSection((previousState) => ({
			...previousState,
			[sectionId]: !previousState[sectionId],
		}));
	}

	function handleDraftChange(field, value) {
		if (field === 'date') {
			if (value === '') {
				setDraft((previousDraft) => ({
					...previousDraft,
					date: '',
				}));
				return;
			}

			if (value.length > 10) {
				return;
			}

			if (value.length === 10 && normalizeDateString(value) === null) {
				return;
			}
		}

		setDraft((previousDraft) => ({
			...previousDraft,
			[field]: value,
		}));
	}

	function handleAddTask() {
		const normalizedDate = normalizeDateString(draft.date);
		if (!draft.title.trim() || !normalizedDate) {
			return;
		}

		setActiveTasks((previousTasks) => [
			...previousTasks,
			{
				...draft,
				date: normalizedDate,
				id: createTaskId(),
			},
		]);
		setDraft(initialDraft);
	}

	function handleCompleteTask(taskId) {
		const taskToComplete = activeTasks.find((item) => item.id === taskId);
		if (!taskToComplete) {
			return;
		}

		setActiveTasks((previousTasks) =>
			previousTasks.filter((item) => item.id !== taskId),
		);

		setCompletedTasks((previousCompleted) => [
			taskToComplete,
			...previousCompleted,
		]);
	}

	function handleDeleteTask(taskId, sectionId) {
		if (sectionId === 'completedTaskList') {
			setCompletedTasks((previousTasks) =>
				previousTasks.filter((item) => item.id !== taskId),
			);
			return;
		}

		setActiveTasks((previousTasks) =>
			previousTasks.filter((item) => item.id !== taskId),
		);
	}

	return (
		<div className='app'>
			<TaskForm
				id='taskForm'
				openSection={openSection}
				onToggle={handleToggleSection}
				draft={draft}
				onDraftChange={handleDraftChange}
				onAddTask={handleAddTask}
			/>
			<TaskList
				id='taskList'
				openSection={openSection}
				onToggle={handleToggleSection}
				tasks={visibleActiveTasks}
				onCompleteTask={handleCompleteTask}
				onDeleteTask={handleDeleteTask}
				sortBy={activeSortBy}
				onSortChange={setActiveSortBy}
			/>
			<CompletedTaskList
				id='completedTaskList'
				openSection={openSection}
				onToggle={handleToggleSection}
				tasks={visibleCompletedTasks}
				onDeleteTask={handleDeleteTask}
				sortBy={completedSortBy}
				onSortChange={setCompletedSortBy}
			/>
			<Footer />
		</div>
	);
}

export default App;
