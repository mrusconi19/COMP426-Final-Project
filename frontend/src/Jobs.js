import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Job from './Job';
import JobModal from './JobModal';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Jobs({jobs}) {

    //const classes = useStyles();
    const theme = useTheme();

    // Modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    function handleClickOpen() {
      setOpen(true);
    }  
    function handleClose() {
      setOpen(false);
    }

    const h2Style = {
        color: "#f1f1f1"
    }

    // Handle number of results per page
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    // step == 0, show 0 - 49 results
    // step == 1, show 50 - 99 results

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        //scrollToTop();
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        //scrollToTop();
    }    

    // console.log('job is', jobs[0]);

        return (
            <div className="jobs">
                <JobModal open={open} job={selectedJob} handleClose={handleClose} />
                {/* <Typography variant="h4" component="h1" style={h1Style}>
                    Entry level Software Jobs
                </Typography> */}
                <Typography variant="h6" component="h2" style={h2Style}>
                    Found {numJobs} Jobs
                </Typography>
                {
                    jobsOnPage.map(
                        (job, i) => <Job key={i} job={job} onClick={() => {
                            //console.log('clicked')
                            handleClickOpen();
                            selectJob(job)
                        }} />
                    )
                }
                <div>
                    Page {activeStep + 1} of {numPages}
                </div>

                <MobileStepper
                    variant="progress"
                    steps={numJobs}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                        </Button>
                    }
                />
            </div>
        )
}