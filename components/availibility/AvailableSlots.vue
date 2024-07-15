<template>
    <v-container>
        <v-row>

            <v-col cols="12" sm="6" md="4" v-for="availability in available" :key="availability.id">
                <v-card>
                    <v-card-title>
                        <v-row align="center" justify="space-between">
                            <v-col cols="10">{{ availability.day ? 'Day' : 'Date' }}:{{
                                availability.day ?`Every week ${availability.day}  upto  ${availability.validUntil}`:availability.date }} </v-col>
                            <v-col cols="2">
                                <v-btn icon small @click.stop="editAvailability(availability)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="slot in availability.timeslots" :key="slot.start_time"
                                @click="bookSlot(slot)">
                                <v-list-item-content>
                                    {{ slot.start_time }} - {{ slot.end_time }}
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Edit Availability Dialog -->
        <v-dialog v-model="dialog" max-width="1200px">
            <v-card>
                <v-card-title>
                    Edit Availability
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <scheduleData />
                </v-card-text>
                <!-- <v-card-actions>
            <v-btn color="primary" @click="saveChanges">Save</v-btn>
          </v-card-actions> -->
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import scheduleData from '../schedule/scheduleData.vue';
export default {
    components: {
        scheduleData: scheduleData
    },
    props: {
        available: Array
    },
    data() {
        return {
            dialog: false, // Controls the visibility of the dialog
            selectedAvailability: {} // Holds the currently selected availability for editing
        }
    },
    mounted() {
        this.$bus.$on('schedule', () => {
            this.dialog = false;
        });
    },
    methods: {
        bookSlot(slot) {
            alert(`Booking slot: ${slot.start_time} - ${slot.end_time}`);
        },
        editAvailability(availability) {
            console.log(availability,"dsfdsfdsfdsfsdfds");
            this.selectedAvailability = { ...availability }; // Copy the availability data to the form
            console.log(this.selectedAvailability.id, "ssssssssssssssssss")
            this.$store.commit("SET_SCHEDULE_ID", this.selectedAvailability.id);
            let req = [{
                date: this.selectedAvailability.date,
                type:this.selectedAvailability.day?'day':'date',
                day:this.selectedAvailability.day,
                validUntil:this.selectedAvailability.validUntil,
                dateMenu: false,
                fromTime: this.selectedAvailability.start_time,
                fromMenu: false,
                toTime: this.selectedAvailability.end_time,
                toMenu: false,
                duration: this.selectedAvailability.duration,
                durationMenu: false,
            }];

            this.$store.commit("SET_SCHEDULE", req);
            this.dialog = true; // Open the dialog
        },
        saveChanges() {
            // Implement your save logic here
            this.dialog = false; // Close the dialog after saving changes
            alert('Changes saved!');
        }
    }
}
</script>