import './TaskList.scss';

import CustomCloseBtn from '../CustomCloseBtn/CustomCloseBtn.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import TaskTitle from '../TaskTitle/TaskTitle.jsx';

function TaskList({ id, openSection, onToggle, tasks, onCompleteTask, onDeleteTask, sortBy, onSortChange }) {
	return (
		<section className={`section-panel ${openSection[id] ? 'open' : ''}`} id={id}>
			<div className='section-header'>
				<TaskTitle title='Active tasks' />
				<CustomCloseBtn onClick={() => onToggle(id)} open={openSection[id]} />
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
					className={sortBy === 'priority' ? 'sort-button active' : 'sort-button'}
					onClick={() => onSortChange('priority')}
				>
					By priority
				</button>
			</div>

			{openSection[id] && (
				<div className='task-list' role='list'>
					{tasks.length === 0 ? (
						<p className='empty-state'>No tasks to show</p>
					) : (
						tasks.map((task) => (
							<TaskItem
								key={task.id}
								task={task}
								section={id}
								onComplete={() => onCompleteTask(task.id)}
								onDelete={() => onDeleteTask(task.id, id)}
							/>
						))
					)}
				</div>
			)}
		</section>
	);
}

export default TaskList;
