import './TaskForm.scss';

import CustomCloseBtn from '../CustomCloseBtn/CustomCloseBtn.jsx';
import TaskTitle from '../TaskTitle/TaskTitle.jsx';

const priorities = [
	{ value: 'high', label: 'High' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'low', label: 'Low' },
];

function TaskForm({
	id,
	openSection,
	onToggle,
	draft,
	onDraftChange,
	onAddTask,
}) {
	function handleSubmit(event) {
		event.preventDefault();
		onAddTask();
	}

	return (
		<section
			className={`section-panel ${openSection[id] ? 'open' : ''}`}
			id={id}
		>
			<div className='section-header'>
				<TaskTitle title='Create new task' />
				<CustomCloseBtn
					onClick={() => onToggle(id)}
					open={openSection[id]}
				/>
			</div>

			{openSection[id] && (
				<form
					className='task-form'
					onSubmit={handleSubmit}
				>
					<label className='field'>
						<span>Task description</span>
						<input
							type='text'
							autoComplete='off'
							placeholder='Enter task text...'
							required
							value={draft.title}
							onChange={(event) => onDraftChange('title', event.target.value)}
						/>
					</label>

					<label className='field'>
						<span>Priority</span>
						<select
							value={draft.priority}
							onChange={(event) =>
								onDraftChange('priority', event.target.value)
							}
						>
							{priorities.map((item) => (
								<option
									key={item.value}
									value={item.value}
								>
									{item.label}
								</option>
							))}
						</select>
					</label>

					<label className='field'>
						<span>Deadline</span>
						<input
							type='date'
							inputMode='numeric'
							min='1900-01-01'
							max='9999-12-31'
							required
							value={draft.date}
							onChange={(event) => onDraftChange('date', event.target.value)}
						/>
					</label>
					<button
						type='submit'
						className='submit-button'
					>
						Add task
					</button>
				</form>
			)}
		</section>
	);
}

export default TaskForm;
