#!/bin/bash

skillId="$1"

ask api delete-skill -s ${skillId}
