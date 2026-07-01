import './TaskItem.scss';

function formatDate(inputDate) {
	if (!inputDate) {
		return 'No date';
	}

	if (/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
		const [year, month, day] = inputDate.split('-');
		return `${day}.${month}.${year}`;
	}

	const parsed = new Date(inputDate);
	if (Number.isNaN(parsed.getTime())) {
		return inputDate;
	}

	return parsed.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
}

function TaskItem({ task, section, onComplete, onDelete }) {
	return (
		<div
			className={`task-item ${task.priority}`}
			role='listitem'
		>
			<div className='task-info'>
				<h3>{task.title}</h3>
				<div className='task-meta'>
					<span className='task-meta-label'>Priority:</span>
					<span>{task.priority}</span>
				</div>
				<div className='task-meta'>
					<span className='task-meta-label'>Due:</span>
					<time dateTime={task.date}>{formatDate(task.date)}</time>
				</div>
			</div>

			<div className='task-buttons'>
				{section !== 'completedTaskList' && (
					<button
						type='button'
						className='action-button complete-button'
						onClick={onComplete}
					>
						Complete
					</button>
				)}
				<button
					type='button'
					className='action-button delete-button'
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default TaskItem;
