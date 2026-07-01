import './CompletedTaskList.scss';

import CustomCloseBtn from '../CustomCloseBtn/CustomCloseBtn.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import TaskTitle from '../TaskTitle/TaskTitle.jsx';

function CompletedTaskList({
	id,
	openSection,
	onToggle,
	tasks,
	onDeleteTask,
	sortBy,
	onSortChange,
}) {
	return (
		<section
			className={`section-panel ${openSection[id] ? 'open' : ''}`}
			id={id}
		>
			<div className='section-header'>
				<TaskTitle title='Completed tasks' />
				<CustomCloseBtn
					onClick={() => onToggle(id)}
					open={openSection[id]}
				/>
			</div>

			<div className='sort-controls'>
				<button
					type='button'
					className={sortBy === 'date' ? 'sort-button active' : 'sort-button'}
					onClick={() => onSortChange('date')}
				>
					By date
				</button>
				<button
					type='button'
					className={
						sortBy === 'priority' ? 'sort-button active' : 'sort-button'
					}
					onClick={() => onSortChange('priority')}
				>
					By priority
				</button>
			</div>

			{openSection[id] && (
				<div
					className='task-list completed-list'
					role='list'
				>
					{tasks.length === 0 ? (
						<p className='empty-state'>No completed tasks yet</p>
					) : (
						tasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								section={id}
								onDelete={() => onDeleteTask(task.id, id)}
							/>
						))
					)}
				</div>
			)}
		</section>
	);
}

export default CompletedTaskList;
